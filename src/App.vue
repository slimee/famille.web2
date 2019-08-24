<template>
    <v-app id="app" :light="!dark" :dark="dark">
        <transition name="slide-fade-simple" mode="out-in">
            <router-view></router-view>
        </transition>
        <snack :snack="snack"></snack>
    </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import UserIcon from './components/user/UserIcon'
  import Snack from './components/snack/Snack'
  import LoggedIn from './components/user/LoggedIn'
  import LoginSuscribeList from './components/user/LoginSuscribeList'
  import Card from './components/card/Card'

  export default {
    name: 'App',
    components: { Card, LoginSuscribeList, LoggedIn, Snack, UserIcon },
    computed: {
      ...mapState({
        snack: s => s.snack.snack,
        dark: s => s.app.dark,
      }),
    },
    mounted() {
      this.$store.dispatch('app/mount')
    },
  }
</script>
