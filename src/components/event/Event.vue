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
            <v-list-item-subtitle v-else @click="startEditDate">{{subtitle}}</v-list-item-subtitle>

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

  export default {
    name: 'event',
    components: { DateTimeEditor, DateEditor, UserIcon },
    props: {
      event: Object,
      creating: Boolean,
    },
    data: () => ({ show: false, user: null, editingTitle: false, editingDate: false, titleTemp: null }),
    methods: {
      ...mapActions('user', ['lookupUser']),
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
    },
    mounted() {
      if (this.event) {
        if (this.event.oid) {
          this.lookupUser({ _id: this.event.oid })
            .then(user => this.user = user)
        } else {
          console.error('event sans oid', this.event)
        }
      }
    },
    computed: {
      ...mapState('event', ['expandedEvent']),
      subtitle() {
        return `${displayDate(this.event.date)} à ${displayHour(this.event.date)}`
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