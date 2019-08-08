import { mapActions } from 'vuex'
import On from '../../const/on'

export default {
  data() {
    return { ok: false }
  },
  created() {
    this.checkAuth().then(v => this.ok = v)
  },
  methods: {
    ...mapActions({ checkAuth: On.CHECK_AUTH }),
  },
}
