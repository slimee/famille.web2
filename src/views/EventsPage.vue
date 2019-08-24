<template>
    <v-container>
        <v-layout column>
            <template v-if="currentUser">
                <v-card v-if="newEvent">
                    <v-card-title>Ajouter une invitation</v-card-title>
                    <event :event="newEvent" creating/>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn text @click="saveNewEvent">
                            <v-icon large color="green">mdi-content-save-outline</v-icon>
                            enregistrer
                        </v-btn>
                        <v-btn text @click="cancelNewEvent">
                            <v-icon large color="red">mdi-close</v-icon>
                            annuler
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-btn v-else @click="startAddingEvent" class="my-2" color="primary">Ajouter</v-btn>
            </template>
            <event-list v-if="events && events.length" :events="events" @select="open" class="my-2"/>
        </v-layout>
    </v-container>
</template>

<script>

  import EventList from '../components/event/EventList'
  import { mapActions, mapState } from 'vuex'
  import Event from '../components/event/Event'
  import moment from 'moment'

  export default {
    name: 'events-page',
    components: { Event, EventList },
    data: () => ({
      event: null,
    }),
    computed: {
      ...mapState('event', ['events', 'newEvent']),
      ...mapState('user', ['currentUser']),
    },
    methods: {
      ...mapActions('event', ['search', 'initNewEvent', 'open']),
      ...mapActions('event', ['saveNewEvent','cancelNewEvent']),
      ...mapActions('snack', ['snackerror']),
      startAddingEvent() {
        this.initNewEvent({ oid: this.currentUser._id })
      },
    },
    mounted() {
      this.search({ from: moment().startOf('day') })
    },
  }
</script>
