import { del, paramsOf, post, put } from '../api/rest'

export default {
  namespaced: true,
  state: {
    showViewEdit: false,
    current: null,
    monthEvents: [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return {
        _id: day + Math.random(),
        date: d,
        title: day,
      }
    }),
    dayEvents: [...Array(2)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return {
        _id: day + Math.random(),
        date: d,
        title: day + Math.random(),
      }
    }),
  },
  mutations: {
    setCurrent(state, event) {
      state.current = event
    },
    setMonthEvents(state, events) {
      state.monthEvents = events
    },
    open(state) {
      state.showViewEdit = true
    },
    close(state) {
      state.showViewEdit = false
    },
  },
  actions: {
    addEvent({ commit }) {
      commit('open')
    },
    open({ commit }, event) {
      commit('selectDay', event)
      commit('open')
    },
    close({ commit }) {
      commit('close')
    },
    async searchMonth({ commit }, params) {
      commit('setMonthEvents', await get(`api/events${paramsOf(params)}`))
    },
    async searchDay({ commit }, params) {
      commit('setDayEvents', await get(`api/events${paramsOf(params)}`))
    },
    async loadCurrent({ commit }, { _id }) {
      commit('open', await get(`api/event/${_id}`))
    },
    save({}, event) {
      return post('api/event', event)
    },
    update({}, event) {
      return put('api/event', event)
    },
    remove({}, { _id }) {
      return del(`api/event/${_id}`)
    },
  },
  getters: {
    selectedDayDate: s => s.current && new Date(s.current),
  },
}