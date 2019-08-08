import Vue from 'vue'

export default {
  data: () => ({
    editing: false,
    initial: {},
    changes: {},
  }),
  computed: {
    final() {
      return Object.assign({}, this.initial, this.changes)
    },
  },
  methods: {
    setInitial(initial) {
      this.initial = initial
    },
    applyAllChanges(changes) {
      Object.keys(changes).forEach(
        key => {
          this.forceChange(key, changes[key])
        },
      )
    },
    forceChange(key, value) {
      Vue.set(this.changes, key, value)
    },
    change(field, newvalue) {
      if (field.value !== newvalue) {
        if (newvalue !== undefined) {
          Vue.set(this.changes, field.key, newvalue)
        } else {
          Vue.delete(this.changes, field.key)
        }
      } else {
        Vue.delete(this.changes, field.key)
      }
    },
    saved(changes) {
      Object.assign(this.initial, changes)
      this.changes = {}
      this.$router.push({ name: this.$route.name, params: { path: this.final.path } })
      this.onSaved && this.onSaved()
    },
    deleted() {
      this.changes = {}
      this.setInitial({})
      this.$router.push({ name: this.$route.name, params: { path: 'new' } })
    },
  },
}
