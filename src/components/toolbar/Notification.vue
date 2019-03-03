<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          flat
          class="transparent"
          v-on="on"
          :disabled="!$store.state.notification.polling.enable"
        >
          <v-icon v-if="$store.state.notification.polling.enable"
            >notifications</v-icon
          >
          <v-icon v-else>notifications_off</v-icon>
        </v-btn>
      </template>
      <v-list two-line>
        <v-list-tile
          avatar
          ripple
          v-for="notification in $store.state.notification.items"
          :key="notification.date"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ notification.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{
              notification.date | moment('LLL')
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      selectProfile: 'profile/select'
    })
  }
}
</script>
