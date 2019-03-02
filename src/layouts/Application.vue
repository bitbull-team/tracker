<template>
  <v-content>
    <toolbar @toggle-nav-menu="drawer = !drawer" />
    <nav-menu v-model="drawer" />
    <v-container fluid fill-height class="white">
      <router-view />
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'

import Toolbar from '@/components/Toolbar'
import NavMenu from '@/components/NavMenu'

export default {
  data: () => ({
    drawer: false
  }),
  components: {
    Toolbar,
    NavMenu
  },
  async mounted() {
    await this.loadCurrentUser();
  },
  methods: {
    ...mapActions({
      loadCurrentUser: 'api/loadCurrentUser'
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
