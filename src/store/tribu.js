import { createStringObjectId } from '../service/calculations'

const fakeTribus = user => ([
  { _id: createStringObjectId(), name: 'Médinis', color: 'blue' },
  { _id: createStringObjectId(), name: 'Morins', color: 'green' },
])

export default {
  namespaced: true,
  state: {
    userTribus: [],
    defaultTribu: null,
  },
  mutations: {
    setUserTribus(state, tribus) {
      state.userTribus = tribus
    },
    setDefaultTribu(state, tribu) {
      state.defaultTribu = tribu
    },
  },
  actions: {
    tribuFromUser({ commit }, user) {
      let fakeTribus1 = fakeTribus(user)
      commit('setUserTribus', fakeTribus1)
      commit('setDefaultTribu', fakeTribus1[0])
    },
    async lookupTribu({ state }, { _id }) {
      return state.userTribus.find(t => t._id === _id)
    },
  },
}