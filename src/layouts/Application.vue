<template>
  <v-content class="align-start">
    <toolbar @toggle-nav-menu="drawer = !drawer"/>
    <nav-menu v-model="drawer"/>
    <v-container fluid fill-height class="white">
      <router-view/>
    </v-container>
    <v-snackbar v-model="snackBar" :right="true" :bottom="true">
      {{ $store.state.notification.snackBar }}
      <v-btn flat @click="snackBar = false">Close</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'

import Toolbar from '@/components/Toolbar'
import NavMenu from '@/components/NavMenu'

export default {
  data: () => ({
    drawer: false,
    snackBar: false
  }),
  components: {
    Toolbar,
    NavMenu
  },
  async mounted() {
    await this.loadCurrentUser()
    this.startPolling()
    this.$store.watch(
      state => state.notification.polling.lastNew,
      () => {
        this.snackBar = true
      }
    )
  },
  methods: {
    ...mapActions({
      loadCurrentUser: 'api/loadCurrentUser',
      startPolling: 'notification/startPolling'
    })
  }
}
</script>

<style>
.transparent.v-btn--active::before,
.transparent.v-btn:hover::before,
.transparent.v-btn:focus::before {
  background-color: transparent;
}
</style>
