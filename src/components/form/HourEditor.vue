<template>
    <div>
        <v-time-picker @input="validate" format="24hr" fullWidth landscape locale="fr-FR" v-model="timeString"></v-time-picker>
        <v-btn @click="validate" block color="primary">OK</v-btn>
    </div>
</template>

<script>
  export default {
    name: 'date-editor',
    data: () => ({
      timeString: null,
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
        return this.value || new Date()
      },
      final() {
        return new Date(this.initial.toISOString().substr(0, 11) + this.timeString)
      }
    },
    watch: {
      initial() {
        this.timeString = this.initial.toISOString().substr(11)
      }

    }
  };
</script>
