const mapValidationErrors = ({ message, errors }) =>
  `${message}. "${Object.values(errors)
    .map(err => `${err.param} ${err.msg}`)
    .join('; ')}"`

const toSnack = ex =>
  ex.status === 404 && { text: 'L\'élément n\'a pas été trouvé. Il n\'existe pas ou il est en préparation.', color: 'orange' }
  ||
  ex.status === 403 && { text: 'Interdit.', icon: 'mdi-block-helper', color: 'orange' }
  ||
  ex.status === 401 && { text: 'Connectez-vous pour faire cette action.', icon: 'mdi-power-plug-off', color: 'orange' }
  ||
  ex.status >= 500 && { text: 'Oups nous avons une erreur de fonctionnement. Rééssayez plus tard, rapportez le bug si cela persiste ou vous embête.', icon: 'mdi-bug' }
  ||
  ex.status && ex.body && ex.body.errorCode === 2 && { text: mapValidationErrors(ex.body) }
  ||
  ex.status && ex.body && ex.body.errorCode && { text: ex.body.message }
  ||
  ex.statusText && { text: ex.statusText }
  ||
  ex && { text: ex }
  ||
  { text: 'Erreur indéfinie.' }

export const snack = () => ({ visible: false, multiline: false, timeout: 5000, vertical: false, text: 'this message should be overriden.', color: 'green' })

export default {
  namespaced: true,
  state: {
    snack: snack(),
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack
    },
  },
  actions: {
    'snack': ({ commit }, snackOptions) => {
      if (snackOptions.color !== 'green') {
        snackOptions.timeout = 0
      }
      commit('setSnack', Object.assign(snack(), { visible: true, ...snackOptions }))
    },
    'snackerror': ({ dispatch }, ex) => dispatch('snack', { multiline: true, color: 'orange', ...toSnack(ex) }),
  },
  getters: {},
}