<template>
    <card>
        <span>
            <img src="/img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
            <img src="/img/blue.svg" style="width:20%">
            <img src="/img/forest.svg" style="width:28%">
            <v-container>
                <v-card-text>
                    <v-layout align-center row v-if="loginFailed"><v-icon color="red">report_problem</v-icon><span class="error--text">Mail inconnu ou mot de passe incorrect</span></v-layout>
                    <v-form ref="form" v-model="valid" v-on:submit.prevent="validate">
                        <v-text-field :rules="[mailRequired, validMail]" autocomplete="username" autofocus label="Mail"
                                      name="mail"
                                      placeholder="vous@exemple.com"
                                      prepend-icon="mail" required type="text" v-model="mail"
                        ></v-text-field>
                        <v-text-field :append-icon="showPwd ? 'visibility_off' : 'visibility'" :rules="[validPassword]" :type="showPwd ? 'text' : 'password'"
                                      @click:append="showPwd = !showPwd"
                                      autocomplete="current-password" label="Mot de passe"
                                      name="password" prepend-icon="lock" required
                                      v-model="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="validate" color="primary">Connexion</v-btn>
                </v-card-actions>
            </v-container>
        </span>
    </card>
</template>

<script>
  import { mapActions } from 'vuex';
  import On from '../../const/on';
  import Card from '../layout/Card';
  import { GO } from '../../const/go';
  import { mailRequired, validMail } from '../../services/rules';

  export default {
    components: { Card },
    data() {
      return {
        GO,
        showPwd: false,
        valid: null,
        mail: null,
        password: null,
        loginFailed: false,
      };
    },
    methods: {
      validPassword(value) {
        return !!value || 'Veuillez saisir un mot de passe';
      },
      mailRequired,
      validMail,
      ...mapActions({ login: On.LOGIN }),
      async validate() {
        this.$refs.form.validate();
        if (this.valid) {
          try {
            await this.login({ mail: this.mail, password: this.password });
            this.$router.push('/');
          } catch (e) {
            this.password = null;
            this.loginFailed = true;
          }
        }
      },
    },
  };
</script>
