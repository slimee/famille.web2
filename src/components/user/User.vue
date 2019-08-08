<template>
    <card>
        <subpage-title :title="user.fullname">
            <user-icon :user="user" slot="left"/>
        </subpage-title>

        <editor :changes="changes"
                :editable="owned" :editor="editor" :initial="initial" @change="change"
                v-model="editing"
        />

        <saver :changes="changes"
               :editor="editor" :final="final" :initial="initial" :update-action="On.UPDATE_USER"
               @saved="saved" copy-forbidden
               delete-forbidden updated-text="Utilisateur mis à jour."
               v-if="owned && !editing"
        />
    </card>
</template>

<script>
  import { mapState } from 'vuex';
  import SubpageTitle from '../common/SubpageTitle';
  import UserIcon from './UserIcon';
  import Editor from '../common/Editor';
  import Saver from '../editor/Saver';
  import On from '../../const/on';
  import Card from '../layout/Card';
  import { formatDate } from '../../services/calculations';
  import Edition from '../editor/Edition';

  export default {
    name: 'user',
    props: ['user'],
    mixins: [Edition],
    components: {
      Card, Saver, Editor, UserIcon, SubpageTitle,
    },
    data: () => ({ On }),
    created() {
      this.initial = this.user;
      this.change({ key: '_id' }, this.initial._id);
    },
    computed: {
      ...mapState({ loggedUser: s => s.user }),
      owned() {
        return this.loggedUser && this.loggedUser._id === this.initial._id;
      },
      editor() {
        return [
          { key: 'description', title: 'Statut', editor: 'textarea-editor' },
          { key: 'fullname', title: 'Nom', editor: 'textarea-editor' },
          { key: 'mail', title: 'Adresse', noedit: true },
          {
            key: 'wantSuscribeDate', title: 'Inscription', displayFct: formatDate, noedit: true,
          },
        ];
      },
    },
    methods: {
      onSaved() {
        if (this.owned) {
          Object.assign(this.loggedUser, this.initial);
        }
      },
    },
  };
</script>
