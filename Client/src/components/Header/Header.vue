<template>
  <v-app-bar
      height="64"
      fixed
      color='primary'
      dark
    >
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
        <template v-if="DRAWER_STATE">
            <v-icon  style="font-size: 28px">mdi-arrow-left</v-icon>
        </template>
        <template v-else>
            <v-icon style="font-size: 28px">mdi-menu</v-icon>
        </template>
    </v-btn>
    <v-toolbar-title>Vue.js task according to client(Salman Saeed)</v-toolbar-title>
    <v-spacer></v-spacer>

  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from 'vuex'
  import config from '../../config';

  export default {
    name: 'Header',
    data: () => ({
      config,
    
    }),
    computed: {
      ...mapState(['drawer']),
      DRAWER_STATE :{
        get() {
          return this.drawer
        },
      }
    },
    methods: {
      ...mapActions([ 'TOGGLE_DRAWER' ]),
     
    }
  };
</script>

<style src="./Header.scss" lang="scss"></style>
