<template>
  <v-list three-line>
    <v-list-tile v-for="issue in items" :key="issue.id">
      <v-list-tile-content>
        <v-list-tile-title>{{ issue.subject }}</v-list-tile-title>
        <v-list-tile-sub-title>
          {{ $t('Status') }}: {{ issue.status.name }}
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          {{ $t('Project') }}: {{ issue.project.name }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon @click="startNewTimer({ issueId: issue.id, comments: '' })">
          play_circle_outline
        </v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions({
      startTimer: 'timer/start'
    }),
    startNewTimer({ issueId, comments, activityId }) {
      this.startTimer({ issueId: issueId, comments: comments })
      this.$router.push({ name: 'timers' })
    }
  }
}
</script>
