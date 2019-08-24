<template>
    <span>
        <v-avatar v-if="tribu" :style="{backgroundColor:tribu.color}">
            <span :style="{color:overcolor(tribu.color)}" class="display-1 font-weight-bold">{{initiales(tribu.name)}}</span>
        </v-avatar>
        <v-icon v-else>mdi-account-question</v-icon>
    </span>
</template>
<script>
  import { initiales, overcolor } from '../../service/util'

  export default {
    name: 'tribu-icon',
    props: ['tribu'],
    methods: {
      overcolor, initiales,
    },
  }
</script>
