<template>
    <v-menu>
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" text icon>
                <user-icon :user="user"/>
            </v-btn>
        </template>

        <v-list v-if="user">
            <v-list-item @click="goto(GO.USER)">
                <user-icon :user="user"/>
                <v-list-tile-content>
                    <v-list-tile-title>{{user.fullname}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.mail}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-item>

            <v-list-item @click="logout">
                <v-list-tile-avatar>
                    <v-icon>mdi-power-plug-off</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>Déconnexion</v-list-tile-content>
            </v-list-item>
        </v-list>
        <login-suscribe-list v-else style="width: 17em"/>
    </v-menu>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { initiales, overcolor } from '../../util/util'
  import UserIcon from './UserIcon'
  import LoginSuscribeList from './LoginSuscribeList'

  export default {
    name: 'logged-in',
    components: { LoginSuscribeList, UserIcon },
    computed: {
      ...mapState('user', { user: s => s.current }),
    },
    methods: {
      overcolor,
      initiales,
      ...mapActions('user', ['logout']),
    },
  }
</script>
