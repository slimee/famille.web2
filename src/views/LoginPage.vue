<template>
    <card>
        <span>
            <img src="@/assets/logo.svg" style="width:20%" class="pl-5 pt-5">
            <v-container>
                <v-card-actions>
                    <v-spacer/>
                    <h1>Connexion</h1>
                    <v-spacer/>
                </v-card-actions>
                <v-card-text>
                    <v-layout v-if="loginFailed" row align-center><v-icon color="red">mdi-alert</v-icon><span class="error--text">Mail inconnu ou mot de passe incorrect</span></v-layout>
                    <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                        <v-text-field prepend-icon="mdi-email-outline" name="mail" label="Mail" placeholder="vous@exemple.com"
                                      type="text"
                                      autofocus
                                      autocomplete="username" v-model="mail" required :rules="[mailRequired, validMail]"
                        ></v-text-field>
                        <v-text-field prepend-icon="mdi-lock-outline" name="password" label="Mot de passe"
                                      :append-icon="showPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                      :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd"
                                      autocomplete="current-password" v-model="password" required
                                      :rules="[validPassword]"
                                      v-on:keyup.enter="validate"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:'suscribe'}">S'inscrire...</router-link>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validate" :disabled="!valid">Connexion</v-btn>
                </v-card-actions>
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
    data: function () {
      return {
        showPwd: false,
        valid: null,
        mail: null,
        password: null,
        loginFailed: false,
      }
    },
    methods: {
      validPassword(value) {
        return !!value || 'Veuillez saisir un mot de passe'
      },
      mailRequired,
      validMail,
      ...mapActions('user', ['login']),
      validate: async function () {
        this.$refs.form.validate()
        if (this.valid) {
          try {
            await this.login({ mail: this.mail, password: this.password })
            this.$router.push('/')
          } catch (e) {
            this.password = null
            this.loginFailed = true
          }
        }
      },
    },
  }
</script>