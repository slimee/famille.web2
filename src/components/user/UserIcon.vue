<template>
    <span>
        <v-avatar v-if="user" :style="{backgroundColor:user.color}">
            <span :style="{color:overcolor(user.color)}" class="display-1 font-weight-bold">{{initiales(user.fullname)}}</span>
        </v-avatar>
        <v-icon v-else>mdi-account-question</v-icon>
    </span>
</template>
<script>
  import { initiales, overcolor } from '../../service/util'

  export default {
    name: 'user-icon',
    props: ['user', 'size'],
    methods: {
      overcolor, initiales,
    },
  }
</script>
