<template>
  <v-content class="align-start">
    <toolbar @toggle-nav-menu="drawer = !drawer" />
    <nav-menu v-model="drawer" />
    <v-container v-if="!loading" fluid fill-height>
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
      <div>
        <div class="text-xs-center">
          <v-btn :loading="true" large flat icon />
        </div>
        <div class="text-xs-center">
          {{ loadingMsg }}
        </div>
      </div>
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
    loading: true,
    loadingMsg: ''
  }),
  async mounted() {
    this.loading = true
    this.loadingMsg = 'perform login..'
    try {
      const user = await this.loadCurrentUser()
    } catch (error) {
      this.loadingMsg = 'login error'
      this.$router.push({
        name: 'edit-profile',
        params: { id: this.$store.state.profile.current.id }
      })
    }
    this.loadingMsg = 'loading data..'

    const promises = []

    if (
      !this.$store.state.project ||
      this.$store.state.project.items.length === 0
    ) {
      promises.push(
        this.loadProjects().then(
          () => (this.loadingMsg = 'loaded projects, still loading..')
        )
      )
    }

    if (
      !this.$store.state.timeEntryActivity ||
      this.$store.state.timeEntryActivity.items.length === 0
    ) {
      promises.push(
        this.loadTimeEntryActivity().then(
          () => (this.loadingMsg = 'loaded activities, still loading..')
        )
      )
    }

    if (
      !this.$store.state.issueStatus ||
      this.$store.state.issueStatus.items.length === 0
    ) {
      promises.push(
        this.loadIssueStatuses().then(
          () => (this.loadingMsg = 'loaded issues statuses, still loading..')
        )
      )
    }

    if (promises.length > 0) {
      await Promise.all(promises)
    }
    this.loadingMsg = 'all data loaded!'

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
      loadProjects: 'project/loadAll',
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
