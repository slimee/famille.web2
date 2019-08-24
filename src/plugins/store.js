import Vue from 'vue'
import Vuex from 'vuex'
import user from '../store/user'
import app from '../store/app'
import event from '../store/event'
import snack from '../store/snack'
import tribu from '../store/tribu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
    event,
    snack,
    tribu,
  },
})
