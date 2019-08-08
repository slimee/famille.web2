<template>
    <v-app>
        <v-app-bar app>
            <v-avatar size="48px"><img alt="Family" src="@/assets/logo.svg" style="width: 48px;height:48px"></v-avatar>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-light">FAMILLE {{version}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <logged-in :user="user"/>
        </v-app-bar>
        <v-content>
            <router-view/>
            <snack :snack="snack"></snack>
        </v-content>
    </v-app>
</template>

<script>
  import { mapState } from 'vuex';
  import UserIcon from './components/user/UserIcon';
  import Snack from "./components/snack/Snack"
  import LoggedIn from './components/user/LoggedIn'

  export default {
    name: 'App',
    components: { LoggedIn, Snack, UserIcon },
    computed: {
      ...mapState({
        version: s => s.app.version,
        user: s => s.user.current,
        snack: s => s.snack.snack
      }),
    },

  };
</script>
