<template>
    <v-menu>
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" text icon>
                <user-icon :user="user"/>
            </v-btn>
        </template>

        <v-list v-if="user">
            <v-list-item @click="navToUser">
                <user-icon :user="user"/>
                <v-list-item-content>
                    <v-list-item-title>{{user.fullname}}</v-list-item-title>
                    <v-list-item-subtitle>{{user.mail}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item @click="logout">
                <v-list-item-avatar>
                    <v-icon>mdi-power-plug-off</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>Déconnexion</v-list-item-content>
            </v-list-item>
        </v-list>
        <login-suscribe-list v-else style="width: 17em"/>
    </v-menu>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { initiales, overcolor } from '../../service/util'
  import UserIcon from './UserIcon'
  import LoginSuscribeList from './LoginSuscribeList'

  export default {
    name: 'logged-in',
    components: { LoginSuscribeList, UserIcon },
    computed: {
      ...mapState('user', { user: s => s.currentUser }),
    },
    methods: {
      overcolor,
      initiales,
      ...mapActions('user', ['logout','navToUser']),
    },
  }
</script>
