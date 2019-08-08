export default {
  namespaced: true,
  state: {
    token: null,
    xRequestId: null,
    current: null,
  },
  mutations: {},
  actions: {
    logout({ commit }) {
      console.log("logout")
    },
  },
  getters: {
    isAdmin: s => s.current && s.current.rights.startsWith('G'),
  },
}