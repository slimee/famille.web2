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
    mount({ dispatch }) {
      dispatch('darkFromStorage')
      dispatch('user/userFromStorage', null, { root: true })
    },
    darkFromStorage({ commit }) {
      commit('setDark', localStorage.getItem('dark') === 'true')
    },
  },
  getters: {},
}