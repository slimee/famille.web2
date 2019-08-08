<template>
    <v-card>
        <v-list>
            <v-list-item :key="event._id" :value="event" @click="select(event)" v-for="event in events">{{event.title}}</v-list-item>
        </v-list>
    </v-card>
</template>

<script>
  export default {
    name: 'EventList',
    props: {
      events: { type: Array },
    },
    methods: {
      select(event) {
        this.$emit('select', event);
      },
    },
  };
</script>
