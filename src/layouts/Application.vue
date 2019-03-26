<template>
  <v-content class="align-start">
    <toolbar @toggle-nav-menu="drawer = !drawer" />
    <nav-menu v-model="drawer" />
    <v-container fluid fill-height>
      <router-view />
    </v-container>
    <v-snackbar v-model="snackBar" :right="true" :bottom="true">
      {{ $store.state.notification.snackBar }}
      <v-btn flat @click="snackBar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-layout
      v-if="loading"
      :class="{
        white: !$store.state.profile.current.darkMode,
        'grey darken-3': $store.state.profile.current.darkMode
      }"
      class="loading-modal"
      fill-height
      justify-center
      align-center
    >
      <v-btn :loading="true" large flat icon />
    </v-layout>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'

import Toolbar from '@/components/Toolbar'
import NavMenu from '@/components/NavMenu'
import { Promise } from 'q'

export default {
  components: {
    Toolbar,
    NavMenu
  },
  data: () => ({
    drawer: false,
    snackBar: false,
    loading: false
  }),
  async mounted() {
    this.loading = true
    try {
      const user = await this.loadCurrentUser()
    } catch (error) {
      this.$router.push({
        name: 'edit-profile',
        params: { id: this.$store.state.profile.current.id }
      })
    }

    await Promise.all([this.loadIssueStatuses(), this.loadTimeEntryActivity()])

    this.startPolling()
    this.$store.watch(
      state => state.notification.lastNew,
      () => {
        this.snackBar = true
      }
    )
    this.drawMenu()

    this.loading = false
  },
  methods: {
    ...mapActions({
      loadCurrentUser: 'api/loadCurrentUser',
      loadIssueStatuses: 'issueStatus/loadAll',
      loadTimeEntryActivity: 'timeEntryActivity/loadAll',
      startPolling: 'notification/startPolling',
      drawMenu: 'systemTray/drawMenu'
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
.loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
</style>
