<template>
    <v-app-bar app>
        <v-avatar size="48px"><img alt="Family" src="@/assets/logo.svg" style="width: 48px;height:48px"></v-avatar>
        <v-toolbar-title class="headline text-uppercase ml-3">
            <span class="font-weight-light">TRIBU {{version}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <logged-in :user="user"/>
    </v-app-bar>
</template>
<script>
  import LoggedIn from '../user/LoggedIn'
  import { mapState } from 'vuex'

  export default {
    name: 'app-bar',
    components: { LoggedIn },
    computed: {
      ...mapState({
        version: s => s.app.version,
        user: s => s.user.currentUser,
      }),
    },
  }
</script>