<template>
    <v-list>
        <v-list-item>
            <v-list-item-avatar>
                <user-icon :user="user"/>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{(user && user.fullname) || 'Visiteur'}}</v-list-item-title>
                <v-list-item-subtitle>{{(user && 'Contrôle d\'accès') || 'non connecté'}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <v-btn @click="connect" block class="elevation-0" outlined>Connexion</v-btn>
        </v-list-item>
        <v-list-item>
            <v-btn @click="suscribe" block class="elevation-0" outlined>Inscription</v-btn>
        </v-list-item>
    </v-list>
</template>

<script>
  import { mapState } from 'vuex'
  import UserIcon from './UserIcon'

  export default {
    name: 'login-suscribe-list',
    components: { UserIcon },
    computed: {
      ...mapState('user', { user: s => s.currentUser }),
    },
    methods: {
      suscribe() {
        this.$router.push({ name: 'suscribe' });
        this.$emit('close')
      },
      connect() {
        this.$router.push({ name: 'login' });
        this.$emit('close')
      },
    },
  }
</script>
