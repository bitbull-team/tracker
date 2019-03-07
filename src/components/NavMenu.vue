<template>
  <v-navigation-drawer
    v-model="isOpen"
    :mini-variant="miniVariant"
    :mini-variant-width="90"
    :clipped="clipped"
    fixed
    app
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon x-large>
              person
            </v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ $store.state.api.currentUser.firstname }}
              {{ $store.state.api.currentUser.lastname }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <v-divider />
      <v-list-tile :to="{ name: 'dashboard' }">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('Dashboard') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <v-list-tile :to="{ name: 'issues' }">
        <v-list-tile-action>
          <v-icon>assignment</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('Issues') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{ name: 'timers' }">
        <v-list-tile-action>
          <v-icon>timer</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('Timers') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    clipped: false,
    fixed: true,
    miniVariant: false
  }),
  computed: {
    isOpen: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>
.route-selected {
  background: rgba(0, 0, 0, 0.04);
}
.side-btn {
  cursor: pointer;
  position: absolute !important;
  right: 0;
  top: 50%;
}
</style>
