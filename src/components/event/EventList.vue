<template>
    <v-card>
        <v-list three-line>
            <template v-for="event in events">
                <event :event="event" @select="select(event)" :key="event._id"/>
            </template>
        </v-list>
    </v-card>
</template>

<script>
  import Event from './Event'

  export default {
    name: 'EventList',
    components: { Event },
    props: {
      events: { type: Array },
    },
    data: () => ({ user: null }),
    methods: {
      select(event) {
        this.$emit('select', event)
      },
    },
  }
</script>
