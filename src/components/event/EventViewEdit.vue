<template>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-text>
                <editor :changes="changes"
                        :editor="editor" :initial="initial" @change="change"
                        v-model="editing"
                ></editor>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <saver :changes="changes"
                       :deleteAction="remove" :editor="editor" :final="final"
                       :initial="initial"
                       :no-delete="!canDelete" :saveAction="save" :udpateAction="update"
                       no-copy v-if="!editing"
                ></saver>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import Editor from '../form/Editor'
  import Edition from "../form/Edition"
  import { mapGetters, mapState, mapActions } from 'vuex'
  import Saver from "./../form/Saver"

  export default {
    name: 'EventViewEdit',
    components: { Saver, Editor },
    mixins: [Edition],
    computed: {
      ...mapState({
        event: s => s.event.current,
        showViewEdit: s => s.event.showViewEdit,
        userId: s => s.user.current && s.user.current._id,
      }),
      ...mapGetters("user", ["isAdmin"]),
      dialog: {
        get() {
          return this.showViewEdit
        },
        set() {
          this.close()
        }
      },
      editor() {
        return [
          { key: "date", title: "Date", editor: "date-editor", displayFct: date => date && date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
          { key: "title", title: "Titre", editor: "text-editor", props: { minLength: 3, maxLength: 100 } },
          { key: "description", title: "Détails", editor: "textarea-editor", props: { maxLength: 1000 }, optional: true },
        ]
      },
      canDelete() {
        return this.userId && this.final.oid && (this.userId === this.final.oid || this.isAdmin)
      }
    },
    methods: {
      ...mapActions('event', ['close', 'save', 'update', 'remove']),
    },
    watch: {
      event(event) {
        this.setInitial(event)
      }
    }
  };
</script>

<style scoped>

</style>
