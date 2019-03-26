<template>
  <v-toolbar class="top-toolbar" fixed app flat>
    <v-layout align-center justify-space-between row fill-height>
      <v-flex xs5 sm3>
        <v-toolbar-side-icon @click="$emit('toggle-nav-menu')" />
        <v-btn icon flat :to="{ name: 'dashboard' }" class="transparent">
          <v-icon>home</v-icon>
        </v-btn>
      </v-flex>
      <v-spacer />
      <v-flex xs5 sm3 class="text-xs-right">
        <v-layout row justify-end align-center>
          <notification />
          <profile-switcher />
        </v-layout>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import ProfileSwitcher from '@/components/toolbar/ProfileSwitcher'
import Notification from '@/components/toolbar/Notification'

export default {
  components: {
    ProfileSwitcher,
    Notification
  }
}
</script>
