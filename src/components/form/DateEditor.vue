<template>
    <v-date-picker fullWidth landscape locale="fr-FR" v-model="dateString"></v-date-picker>
</template>

<script>
  export default {
    name: 'date-editor',
    data: () => ({
      dateString: null,
    }),
    props: {
      value: Date
    },
    methods: {
      validate() {
        this.$emit('save', this.final);
      },
    },
    computed: {
      initial() {
        return this.value
      },
      final() {
        return new Date(`${this.dateString}${this.initial ? this.initial.toISOString().substr(10) : ''}`)
      }
    },
    watch: {
      initial() {
        this.dateString = this.initial.toISOString().substr(0, 10)
      },
      dateString(v) {
        v && this.validate()
      }
    }
  };
</script>
