<template>
    <date-editor v-if="selectingDate" :value="currentValue" @input="selectDate"/>
    <hour-editor v-else :value="currentValue" @input="selectTime"/>
</template>
<script>
  import DateEditor from './DateEditor'
  import HourEditor from './HourEditor'

  export default {
    name: 'date-time-editor',
    components: { HourEditor, DateEditor },
    props: { value: Date },
    data: () => ({
      selectingDate: true,
      pickedValue: null,
    }),
    methods: {
      selectDate(v) {
        this.pickedValue = v
        this.selectingDate = false
      },
      selectTime(v) {
        this.$emit('input', v)
      },
    },
    computed: {
      currentValue() {
        return this.pickedValue || this.value
      },
    },
  }
</script>