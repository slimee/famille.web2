<template>
    <card>
        <span>
            <img src="@/assets/logo.svg" style="width:20%" class="pl-5 pt-5">
            <v-container>
                    <v-card-actions>
                        <v-spacer/>
                        <h1>Confirmer l'inscription</h1>
                        <v-spacer/>
                    </v-card-actions>
                    <v-layout v-if="message" column align-center>
                        <p style="color:red">{{message}}</p>
                        <router-link :to="{name:'suscribe'}">S'inscrire</router-link>
                    </v-layout>
                    <span v-else>
                        <v-card-text>
                            <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                                <v-text-field prepend-icon="mdi-email-outline" name="mail" label="Mail" type="text"
                                              autocomplete="username" v-model="mail" disabled
                                ></v-text-field>
                                <v-text-field prepend-icon="mdi-account" type="text" placeholder="nom d'affichage"
                                              label="Nom d'affichage"
                                              v-model="fullname" required autofocus
                                              :rules="[nameRequired]" :validate-on-blur="true"
                                />
                                <v-text-field prepend-icon="mdi-lock-outline" name="password" label="Mot de passe"
                                              :append-icon="showPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                              :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd"
                                              autocomplete="current-password" v-model="password" required
                                              :rules="[validPassword]"></v-text-field>
                            </v-form>
                        </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="validate" :disabled="!valid">Suivant<v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-card-actions>
                    </span>
                </v-container>
        </span>
    </card>
</template>

<script>
  import Card from '../components/card/Card'
  import { mapActions } from 'vuex'
  import decode from 'jwt-decode'

  export default {
    name: 'confirmation',
    props: ['token'],
    components: { Card },
    data: function () {
      return {
        showPwd: false,
        valid: null,
        fullname: null,
        password: null,
        mail: null,
        message: null,
      }
    },
    methods: {
      ...mapActions('user', ['confirm']),
      nameRequired: value => !!value || 'Veuillez indiquer un nom.',
      validPassword: value => !!value || 'Veuillez choisir un mot de passe',
      validate: async function () {
        this.$refs.form.validate()
        if (this.valid) {
          await this.confirm({ token: this.token, fullname: this.fullname, password: this.password })
          this.$router.push({ name: 'home' });
        }
      },
    },
    mounted: function () {
      try {
        this.mail = decode(this.token).mail
      } catch (e) {
        this.message = 'Confirmation invalide :('
      }
    },
  }
</script>