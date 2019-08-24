<template>
    <v-time-picker @change="validate" format="24hr" fullWidth :landscape="$vuetify.breakpoint.mdAndUp" locale="fr-FR" v-model="timeString"></v-time-picker>
</template>

<script>
  export default {
    name: 'hour-editor',
    data: () => ({
      timeString: null,
    }),
    props: {
      value: Date,
    },
    methods: {
      validate() {
        this.$emit('input', this.final)
      },
    },
    computed: {
      initial() {
        return this.value || new Date()
      },
      final() {
        return new Date(this.initial.toISOString().substr(0, 11) + this.timeString)
      },
    },
    watch: {
      initial() {
        this.timeString = this.initial.toISOString().substr(11)
      },

    },
  }
</script>
