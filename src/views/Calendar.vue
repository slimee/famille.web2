<template>
    <v-container>
        <v-layout column>
            <v-btn @click="addEvent" class="my-2" color="primary">Ajouter</v-btn>
            <v-date-picker :events="datePickerEvents" :landscape="$vuetify.breakpoint.smAndUp"
                           first-day-of-week="1"
                           fullWidth locale="fr-FR" v-model="current"></v-date-picker>
            <event-list :events="dayEvents" @select="open" class="mt-3" v-if="dayEvents && dayEvents.length"/>
        </v-layout>
        <event-view-edit/>
    </v-container>
</template>

<script>

  import EventList from "../components/event/EventList"
  import Edition from "../components/form/Edition"
  import Editor from "../components/form/Editor"
  import { mapState, mapActions } from "vuex"
  import EventViewEdit from "../components/event/EventViewEdit"

  export default {
    name: 'calendar',
    components: { EventViewEdit, Editor, EventList },
    data: () => ({
      current: null,
      event: null,
    }),
    computed: {
      ...mapState('event', ['monthEvents', 'dayEvents']),
      datePickerEvents() {
        return this.monthEvents && this.monthEvents.map(e => e.date.toISOString().substr(0, 10))
      }
    },
    methods: {
      ...mapActions('event', ['open', 'addEvent']),
    }
  }
</script>
