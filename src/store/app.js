import { version } from '../../package.json'

export default {
  namespaced: true,
  state: {
    version,
    dark: false,
  },
  mutations: {
    setDark(state, dark) {
      state.dark = dark
    },
  },
  actions: {
    async mount({ dispatch, state }) {
      await dispatch('darkFromStorage')
      await dispatch('user/userFromStorage', null, { root: true })
      await dispatch('tribu/tribuFromUser', state.currentUser, { root: true })
    },
    darkFromStorage({ commit }) {
      commit('setDark', localStorage.getItem('dark') === 'true')
    },
  },
  getters: {},
}