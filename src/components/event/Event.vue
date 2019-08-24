<template>
    <v-list-item :key="event._id" :value="event">
        <v-list-item-avatar>
            <user-icon :user="user"/>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-text-field autofocus append-icon="mdi-check-bold" v-model="title" v-if="editingTitle" @click:append="updateTitle"
                          @keydown.esc.stop.native="stopEditTitle" @keydown.enter.stop.native="updateTitle" @blur="stopEditTitle"></v-text-field>
            <v-list-item-title v-else @click="startEditTitle">{{title}}</v-list-item-title>

            <date-time-editor v-if="editingDate" @input="updateDate" :value="event.date"/>
            <v-list-item-subtitle v-else @click="startEditDate">{{displayDate}}</v-list-item-subtitle>

            <v-select ref="tribuSelect" v-if="editingTribu" :items="userTribus" label="Tribu" item-text="name" @blur="stopEditTribu" @change="updateTribu" return-object></v-select>
            <v-list-item-subtitle v-else @click="startEditTribu">{{displayTribu}}</v-list-item-subtitle>

        </v-list-item-content>

        <v-list-item-action>
            <v-icon @click="expandEvent(event)">mdi-unfold-more-vertical</v-icon>
        </v-list-item-action>

        <v-expand-transition>
            <div v-show="expandedEvent && event._id === expandedEvent._id">
                <v-card-actions>
                    <v-spacer/>
                    <v-btn text @click="trashEvent(event)">
                        <v-icon color="grey">mdi-delete</v-icon>
                        supprimer
                    </v-btn>
                </v-card-actions>
            </div>
        </v-expand-transition>
    </v-list-item>
</template>
<script>
  import { mapActions, mapState } from 'vuex'

  import UserIcon from '../user/UserIcon'
  import { displayDate, displayHour } from '../../service/util'
  import DateEditor from '../form/DateEditor'
  import DateTimeEditor from '../form/DateTimeEditor'
  import TribuIcon from '../tribu/TribuIcon'

  export default {
    name: 'event',
    components: { TribuIcon, DateTimeEditor, DateEditor, UserIcon },
    props: {
      event: Object,
      creating: Boolean,
    },
    data: () => ({ show: false, user: null, tribu: null, editingTitle: false, editingDate: false, editingTribu: false, titleTemp: null }),
    methods: {
      ...mapActions('user', ['lookupUser']),
      ...mapActions('tribu', ['lookupTribu']),
      ...mapActions('event', ['updateEvent', 'deleteEvent', 'expandEvent']),
      ...mapActions('snack', ['snack', 'snackerror']),
      trashEvent() {
        this.deleteEvent(this.event)
          .then(() => this.snack({ text: 'Supprimé', color: 'green' }))
          .catch(this.snackerror)
      },
      updateTitle() {
        if (this.creating) {
          this.event.title = this.titleTemp
          this.editingTitle = false
        } else {
          this.updateEvent({ _id: this.event._id, title: this.titleTemp })
            .then(() => {
              this.event.title = this.titleTemp
              this.editingTitle = false
              this.snack({ text: 'Enregistré', color: 'green' })
            })
            .catch(this.snackerror)
        }
      },
      updateDate(date) {
        if (this.creating) {
          this.event.date = date
          this.editingDate = false
        } else {
          this.updateEvent({ _id: this.event._id, date })
            .then(() => {
              this.event.date = date
              this.editingDate = false
              this.snack({ text: 'Enregistré', color: 'green' })
            })
            .catch(this.snackerror)
        }
      },
      updateTribu(tribu) {
        if (tribu._id === this.event.tid) {
          this.editingTribu = false
          return
        }
        if (this.creating) {
          this.event.tid = tribu._id
          this.editingTribu = false
          this.fetchTribu()
        } else {
          this.updateEvent({ _id: this.event._id, tid: tribu._id })
            .then(() => {
              this.event.tid = tribu._id
              this.editingTribu = false
              this.fetchTribu()
              this.snack({ text: 'Enregistré', color: 'green' })
            })
            .catch(this.snackerror)
        }
      },
      startEditTitle() {
        this.titleTemp = this.event.title
        this.editingTitle = true
      },
      stopEditTitle() {
        this.editingTitle = false
      },
      startEditDate() {
        this.editingDate = true
      },
      stopEditDate() {
        this.editingDate = false
      },
      startEditTribu() {
        this.editingTribu = true
        this.$nextTick(() => {
          this.$refs.tribuSelect.focus()
          this.$refs.tribuSelect.activateMenu()
        })
      },
      stopEditTribu() {
        this.editingTribu = false
      },
      fetchUser() {
        if (this.event && this.event.oid) {
          this.lookupUser({ _id: this.event.oid }).then(user => this.user = user)
        }
      },
      fetchTribu() {
        if (this.event && this.event.tid) {
          this.lookupTribu({ _id: this.event.tid }).then(tribu => this.tribu = tribu)
        }
      },
    },
    mounted() {
      this.fetchUser()
      this.fetchTribu()
    },
    computed: {
      ...mapState('event', ['expandedEvent']),
      ...mapState('tribu', ['userTribus']),
      displayDate() {
        return `${displayDate(this.event.date)} à ${displayHour(this.event.date)}`
      },
      displayTribu() {
        return `tribu ${this.tribu && this.tribu.name}`
      },
      title: {
        get() {
          return this.event.title
        },
        set(v) {
          this.titleTemp = v
        },
      },
    },
  }
</script>