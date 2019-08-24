<template>
    <card v-else>
        <v-app-bar flat>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-light">Bienvenue!</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="headline text-uppercase mr-3">
                <span class="font-weight-light">TRIBU {{version}}</span>
            </v-toolbar-title>
            <v-avatar size="48px"><img alt="Family" src="@/assets/logo.svg" style="width: 48px;height:48px"></v-avatar>
        </v-app-bar>
        <login-suscribe-list/>
    </card>
</template>
<script>
  import Card from '../card/Card'
  import LoginSuscribeList from '../user/LoginSuscribeList'
  import { mapState } from 'vuex'

  export default {
    name: 'welcome-connect',
    components: { Card, LoginSuscribeList },
    computed: {
      ...mapState({ version: s => s.app.version }),
    },
  }
</script>