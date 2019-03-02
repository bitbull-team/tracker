<template>
  <v-toolbar class="top-toolbar white" fixed app flat>
    <v-layout align-center justify-space-between row fill-height>
      <v-flex xs1 sm3>
        <v-toolbar-side-icon @click="$emit('toggle-nav-menu')" />
      </v-flex>
      <v-flex xs6 class="text-xs-center">
        <v-toolbar-title>
          <v-btn :to="{ name: 'dashboard' }" class="transparent" flat
            >Tracker</v-btn
          >
        </v-toolbar-title>
      </v-flex>
      <v-flex xs5 sm3 class="text-xs-right">
        <v-layout row justify-end align-center>
          <profile-switcher />
        </v-layout>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import ProfileSwitcher from '@/components/toolbar/ProfileSwitcher'

export default {
  components: {
    ProfileSwitcher
  }
}
</script>
