<template>
  <v-list three-line>
    <v-list-tile v-for="timer in items" :key="timer.issueId">
      <v-list-tile-content>
        <v-list-tile-title>{{ timer.issueId }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <single-timer />
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import SingleTimer from './Single'

export default {
  components: {
    SingleTimer
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
