<template>
    <card>


        <img src="/img/logo.svg" style="width:20%;padding-top:1em;padding-left:1em;">
        <v-container>
            <v-card-actions>
                <v-spacer/>
                <h1>Confirmer l'inscription</h1>
                <v-spacer/>
            </v-card-actions>
            <v-layout align-center column v-if="message">
                <p style="color:red">{{message}}</p>
                <router-link :to="{name:GO.SUSCRIBE}">S'inscrire</router-link>
            </v-layout>
            <span v-else>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" v-on:submit.prevent="validate">
                                <v-text-field autocomplete="username" disabled label="Mail" name="mail"
                                              prepend-icon="mail" type="text" v-model="mail"
                                ></v-text-field>
                                <v-text-field :rules="[nameRequired]" :validate-on-blur="true" autofocus
                                              label="Nom d'affichage"
                                              placeholder="nom d'affichage" prepend-icon="person" required
                                              type="text" v-model="fullname"
                                />
                                <v-text-field :append-icon="showPwd ? 'visibility_off' : 'visibility'" :rules="[validPassword]" :type="showPwd ? 'text' : 'password'"
                                              @click:append="showPwd = !showPwd"
                                              autocomplete="current-password" label="Mot de passe"
                                              name="password" prepend-icon="lock" required
                                              v-model="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!valid" @click="validate" color="primary">Suivant<v-icon>navigate_next</v-icon></v-btn>
                    </v-card-actions>
                    </span>
        </v-container>
    </card>

</template>

<script>
  import { mapActions } from 'vuex';
  import decode from 'jwt-decode';
  import On from '../../const/on';
  import { GO } from '../../const/go';
  import Card from '../layout/Card';

  export default {
    name: 'confirmation',
    components: { Card },
    props: ['token'],
    data() {
      return {
        GO,
        showPwd: false,
        valid: null,
        fullname: null,
        password: null,
        mail: null,
        message: null,
      };
    },
    methods: {
      ...mapActions({ confirm: On.CONFIRM_SUSCRIBE, close: On.GO_HOME }),
      nameRequired: value => !!value || 'Veuillez indiquer un nom.',
      validPassword: value => !!value || 'Veuillez choisir un mot de passe',
      async validate() {
        this.$refs.form.validate();
        if (this.valid) {
          await this.confirm({ token: this.token, fullname: this.fullname, password: this.password });
          this.close();
        }
      },
    },
    mounted() {
      try {
        this.mail = decode(this.token).mail;
      } catch (e) {
        this.message = 'Confirmation invalide :(';
      }
    },
  };
</script>
