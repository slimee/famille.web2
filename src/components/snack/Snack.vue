<template>
    <v-snackbar
            :color="snack.color"
            :multi-line="snack.multiline"
            :timeout="snack.timeout"
            :vertical="snack.vertical"
            bottom
            v-model="snack.visible"
    >
        <v-layout @click="dispatchAction" align-center class="hand" row>
            <v-btn text v-if="snack.icon">
                <v-icon>{{snack.icon}}</v-icon>
            </v-btn>
            <v-flex>{{ snack.text }}</v-flex>
            <v-btn @click="close" color="white" icon text>
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-layout>
    </v-snackbar>
</template>

<script>

  export default {
    name: "snack",
    props: ['snack'],
    methods: {
      close: function () {
        this.snack.visible = false
      },
      dispatchAction() {
        if (this.snack.action) {
          this.$store.dispatch(this.snack.action)
        }
        this.close()
      }
    }
  }
</script>