import { del, get, paramsOf, post, put } from '../api/rest'
import { createStringObjectId } from '../service/calculations'

export default {
  namespaced: true,
  state: {
    newEvent: null,
    openedEvent: null,
    events: null,
    params: null,
    expandedEvent: null,
  },
  mutations: {
    setNewEvent(state, event) {
      state.newEvent = event
    },
    setOpenedEvent(state, event) {
      state.openedEvent = event
    },
    setEvents(state, events) {
      state.events = events
    },
    setParams(state, params) {
      state.params = params
    },
    setExpanded(state, expanded) {
      state.expandedEvent = expanded
    },
  },
  actions: {
    expandEvent({ commit, state }, event) {
      commit('setExpanded', state.expandedEvent === event ? null : event)
    },
    initNewEvent({ commit }, { oid }) {
      commit('setNewEvent', {
        oid,
        _id: createStringObjectId(),
        date: new Date(),
        title: 'Choisir un titre',
      })
    },
    cancelNewEvent({ commit }) {
      commit('setNewEvent', null)
    },
    open({ commit }, event) {
      commit('setOpenedEvent', event)
    },
    close({ commit }) {
      commit('close')
    },
    search({ commit, dispatch }, params) {
      commit('setParams', params)
      return dispatch('loadEvents')
    },
    async loadEvents({ commit, state }) {
      commit('setEvents', (await get(`api/events${paramsOf(state.params)}`)).map(e =>
        ({
          ...e,
          date: new Date(e.date),
          createdAt: new Date(e.createdAt),
          updatedAt: new Date(e.updatedAt),
        })))
    },
    async saveNewEvent({ commit, dispatch, state }) {
      await post('api/event', state.newEvent)
      commit('setNewEvent', null)
      dispatch('loadEvents')
    },
    updateEvent({ dispatch }, event) {
      return put('api/event', event)
    },
    async deleteEvent({ commit, dispatch }, event) {
      await del(`api/event/${event._id}`)
      dispatch('loadEvents')
    },
  },
}