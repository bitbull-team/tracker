<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn flat class="transparent ma-0 pr-1 pl-1" v-on="on">
          {{ $store.state.profile.current.name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="profile in profiles"
          :key="profile.id"
          @click="selectProfile(profile.id)"
        >
          <v-list-tile-title>{{ profile.name }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{ name: 'create-profile' }">
          <v-list-tile-title>Create new</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      profiles: 'profile/getProfilesWithoutCurrent'
    })
  },
  methods: {
    ...mapActions({
      selectProfile: 'profile/select'
    })
  }
}
</script>
