import { get, post, X_ACCESS_TOKEN } from '../api/rest'
import forage from '../service/forage'
import decode from 'jwt-decode'
import router from '../plugins/router'

const saveToken = (commit, token) => {
  forage.setAccessToken(token)
  commit('setToken', token)
}

export default {
  namespaced: true,
  state: {
    token: null,
    xRequestId: null,
    currentUser: null,
    users: {},
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if (token) {
        let decoded = decode(token)
        state.currentUser = decoded.user
        state.expire = decoded.exp
        console.log('token expire dans', (state.expire - Date.now().valueOf() / 1000) / (3600 * 24), 'j')
      } else {
        state.currentUser = null
      }
    },
  },
  actions: {
    async lookupUser({ state }, { _id }) {
      if (!state.users[_id]) {
        state.users[_id] = await get(`/api/user/${_id}`)
      }
      return state.users[_id]
    },
    logout({ commit }) {
      forage.clearAccessToken()
      commit('setToken', null)
      router.push({ name: 'home' })
    },
    async login({ commit, dispatch }, { mail, password }) {
      const res = await post(`/api/user/login`, { mail, password })
      const token = res.headers.map[X_ACCESS_TOKEN][0]
      saveToken(commit, token)
    },
    suscribe({}, { mail }) {
      return post('api/user/suscribe', { mail })
    },
    async confirm({ commit }, { token, fullname, password }) {
      const res = await post(`/api/user/confirm`, { t: token, fullname, password })
      saveToken(commit, res.headers.map[X_ACCESS_TOKEN][0])
    },
    navToUser() {
      router.push({ name: 'user' })
    },
    async userFromStorage({ commit }) {
      commit('setToken', await forage.getAccessToken())
    },
  },
  getters: {
    isAdmin: s => s.currentUser && s.currentUser.rights && s.currentUser.rights.startsWith('G'),
  },
}