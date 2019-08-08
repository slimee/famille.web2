<template>
    <v-container>
        <v-textarea :counter="maxLength"
                    :error-messages="errors" :label="label" :placeholder="placeholder" @enter="validate" @input="check"
                    autofocus
                    outline v-model="text" v-on:keyup.ctrl.enter="validate"/>

        <v-layout justify-end>
            <v-btn @click="validate" block color="primary">ok</v-btn>
        </v-layout>
    </v-container>
</template>

<script>

  export default {
    name: 'textarea-editor',
    props: {
      value: String,
      maxLength: { type: Number, default: 100 },
      minLength: { type: Number, default: 0 },
      placeholder: String,
      label: String,
    },
    data: () => ({
      text: null,
      errors: null,
    }),
    methods: {
      check() {
        this.errors = this.text
        && this.text.length > this.maxLength ? ['Trop long']
          : this.text.length < this.minLength ? ['Trop court']
            : null;
      },
      validate() {
        this.check();
        if (!this.errors) {
          this.$emit('save', this.text);
        }
      },
    },
    created() {
      this.text = this.value;
    },
  };
</script>
