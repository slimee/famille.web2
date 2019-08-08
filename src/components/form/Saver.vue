<template>
    <div>
        <v-container>
            <v-layout align-center column>
                <v-layout>
                    <v-btn :to="route" v-if="canBrowseToViewPage">Consulter</v-btn>
                    <v-btn :disabled="!canSaveOwn" @click="saveOrUpdate" color="primary">Enregistrer</v-btn>
                    <v-btn @click="saveCopy" color="primary" v-if="canSaveCopy">Enregistrer une copie</v-btn>
                    <v-btn @click="remove" icon v-if="canDelete">
                        <v-icon color="grey">delete</v-icon>
                    </v-btn>
                </v-layout>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import { createStringObjectId } from '../../util/calculations';

  export default {
    name: 'saver',
    props: {
      initial: { type: Object, required: true },
      changes: { type: Object, required: true },
      final: { type: Object, required: true },
      editor: { type: Array, required: true },
      route: { type: Object, default: null },
      saveAction: Function,
      updateAction: Function,
      deleteAction: Function,
      updatedText: { type: String, default: "Evènement bien mis à jour" },
      savedText: { type: String, default: "Evènement bien enregistré" },
      noCopy: { type: Boolean, default: false },
      noDelete: { type: Boolean, default: false },
    },
    methods: {
      ...mapActions('snack', ['snack', 'snackerror']),
      saveOrUpdate() {
        if (this.updateMode) {
          this.update();
        } else {
          this.save();
        }
      },
      saveCopy() {
        const _id = createStringObjectId();
        return this.saveAction({ ...this.final, _id })
          .then(() => {
            this.changes._id = _id;
            this.emitSaved(this.changes);
          }).catch(this.snackerror);
      },
      save() {
        const _id = createStringObjectId();
        return this.saveAction({ ...this.changes, _id })
          .then((r) => {
            console.log("super!!!", r);
            this.changes._id = _id;
            this.emitSaved(this.changes);
            this.snack({ text: this.savedText, color: 'green' });
          }).catch(this.snackerror);
      },
      update() {
        const { _id } = this.initial;
        this.updateAction({ ...this.changes, _id })
          .then(() => {
            this.emitSaved(this.changes);
            this.snack({ text: this.updatedText, color: 'green' });
          }).catch(this.snackerror);
      },
      emitSaved(changes) {
        this.$emit('saved', changes);
      },
      remove() {
        this.deleteAction(this.initial._id)
          .then((deleted) => {
            if (deleted) {
              this.snack({ text: 'Supprimé', color: 'green' });
              this.$emit('deleted');
            }
          }).catch(this.snackerror);
      },
    },
    computed: {
      ...mapState(['user']),
      updateMode() {
        return this.initial && this.initial._id;
      },
      canSave() {
        return this.allRequiredFieldsAreValued && this.changed;
      },
      canSaveOwn() {
        return this.canSave && this.owned;
      },
      owned() {
        return this.user
          && (
            this.changes._id === this.user._id
            || this.changes.oid === this.user._id
            || this.changes.oid === undefined
          );
      },
      canSaveCopy() {
        return this.canSave && this.initial._id && !this.noCopy;
      },
      canDelete() {
        return this.initial && this.initial._id && !this.noDelete;
      },
      canBrowseToViewPage() {
        return this.route && !this.canSave;
      },
      changed() {
        for (const prop in this.changes) {
          if (prop !== '_id' && this.changes.hasOwnProperty(prop)) {
            return true;
          }
        }
        return false;
      },
      allRequiredFieldsAreValued() {
        if (this.editor) {
          for (let i = 0; i < this.editor.length; i++) {
            if (this.editor[i].noedit) {
              break;
            }

            const fieldValued = this.editor[i].optional || (this.final && this.final.hasOwnProperty(this.editor[i].key));

            if (!fieldValued) {
              return false;
            }
          }
        }

        return true;
      },
    },
  };
</script>
