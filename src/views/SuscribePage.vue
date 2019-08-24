<template>
    <card>
        <span>
            <img src="@/assets/logo.svg" style="width:20%" class="pl-5 pt-5">

            <v-container v-if="!mailSent">
                <v-card-actions>
                    <v-spacer/>
                    <h1>Inscription</h1>
                    <v-spacer/>
                </v-card-actions>
                <v-card-text>
                    <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                        <v-text-field prepend-icon="mdi-email-outline" type="text" placeholder="vous@exemple.com"
                                      label="Votre adresse e-mail" autocomplete="username"
                                      v-model="mail" required autofocus
                                      :rules="[mailRequired, validMail]"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:'login'}">Déjà inscrit</router-link>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validate" :disabled="!valid">Inscription</v-btn>
                </v-card-actions>
            </v-container>
            <v-container v-else>
                <v-card-actions>
                    <v-spacer/>
                    <h1>Consultez vos e-mails</h1>
                    <v-spacer/>
                </v-card-actions>
                Nous avons envoyé un mail contenant un lien de confirmation à l’adresse {{mail}}. Comme il expirera bientôt, veuillez le valider rapidement.
            </v-container>
        </span>
    </card>
</template>

<script>
  import { mapActions } from 'vuex'
  import Card from '../components/card/Card'
  import { mailRequired, validMail } from '../service/rules'

  export default {
    components: { Card },
    mixins: [],
    data: function () {
      return {
        valid: null,
        mail: null,
        mailSent: false,
      }
    },
    methods: {
      mailRequired,
      validMail,
      validate: async function () {
        this.$refs.form.validate()
        if (this.valid) {
          this.suscribe({ mail: this.mail })
            .then(() => this.mailSent = true)
            .catch(this.snackerror)
        }
      },
      ...mapActions('snack', ['snackerror']),
      ...mapActions('user', ['suscribe']),
    },
  }
</script>