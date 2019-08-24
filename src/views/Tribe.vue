<template>
 <span>
    <app-bar v-if="user"/>
    <v-content>
        <router-view v-if="user"/>
        <welcome-connect v-else/>
    </v-content>
 </span>
</template>

<script>
  import { mapState } from 'vuex'

  import WelcomeConnect from '../components/tribe/WelcomeConnect'
  import AppBar from '../components/tribe/AppBar'

  export default {
    name: 'App',
    components: { AppBar, WelcomeConnect },
    computed: {
      ...mapState({
        user: s => s.user.currentUser,
      }),
    },

  }
</script>
