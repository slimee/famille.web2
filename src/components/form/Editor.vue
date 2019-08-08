<template>
    <div>

        <v-layout column v-if="!solo || !editing">
            <v-list class="py-0">

                <v-list-item :key="i" @click="toggle(i)" v-for="(field,i) in editor" v-if="field && !editing || idx === i">
                    <v-icon color="red" v-if="field.warning">mdi-alert</v-icon>
                    <span class="font-weight-bold">{{field.title}}:</span>
                    <span :class="`font-weight-medium ml-3 ${changed(field) ? 'font-italic' : ''}`">{{displayValue(field)}}</span>
                    <v-spacer/>
                    <v-list-item-action v-if="editable && !field.noedit && !solo">
                        <v-layout>
                            <v-btn @click.stop="close" icon v-if="editing">
                                <v-icon color="primary">mdi-close-circle</v-icon>
                            </v-btn>
                            <v-btn @click.stop="goto(i)" icon v-else>
                                <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn @click.stop="clear(field)" icon v-if="!editing && changed(field)">
                                <v-icon>mdi-close-circle</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-list-item-action>
                </v-list-item>


            </v-list>
        </v-layout>

        <v-window v-if="editing" v-model="idx">
            <v-window-item :key="i" transition="fade-transition" v-for="(field,i) in editor" v-if="field">
                <template v-if="field">
                    <component :is="field.editor" :value="value(field)" @save="v => save(field, v)" v-bind="field.props"/>
                </template>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>

  const TextareaEditor = () => import('./TextAreaEditor');
  import DateEditor from './DateEditor';

  const HourEditor = () => import('./HourEditor');
  const TextEditor = () => import('./TextEditor');

  export default {
    name: 'editor',
    components: { HourEditor, TextareaEditor, DateEditor, TextEditor },
    props: {
      initial: Object,
      changes: Object,
      editor: Array,
      editable: { type: Boolean, default: true },
      editIdx: { type: Number, default: null },
      solo: { type: Boolean, default: false },
    },
    data() {
      return { idx: this.editIdx };
    },
    computed: {
      editing() {
        return this.idx !== null;
      },
    },
    methods: {
      toggle(i) {
        if (this.editing) {
          this.close();
        } else {
          this.goto(i);
        }
      },
      changed(field) {
        return this.changes.hasOwnProperty(field.key);
      },
      value(field) {
        return this.changes.hasOwnProperty(field.key) ? this.changes[field.key] : this.initial[field.key];
      },
      displayValue(field) {
        return field.displayFct
          ? field.displayFct(this.value(field)) || '...'
          : this.value(field) || '...';
      },
      goto(idx) {
        this.idx = idx;
        this.emitEdit();
      },
      close() {
        this.idx = null;
        this.emitEdit();
      },
      emitEdit() {
        this.$emit('input', this.idx !== null);
      },
      save(field, newvalue) {
        this.$emit('change', field, newvalue);
        this.close();
      },
      clear(field) {
        this.save(field, undefined);
      },
    },
  };
</script>

<style scoped>

</style>
