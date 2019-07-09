<template>
  <div
    v-if="issueId !== null"
    class="generic-timer"
    @click="startExtraTimer(issueId)"
  >
    <v-icon>play_arrow</v-icon>
    <span>{{ $t('Start tracking on a generic task') }}</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      issueId: this.$store.state.profile.current.extraIssueId
    }
  },
  methods: {
    ...mapActions({
      executeStart: 'timer/start'
    }),
    startExtraTimer(issueId) {
      this.executeStart({
        issueId: this.issueId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.generic-timer {
  cursor: pointer;
  margin-bottom: 1em;
  color: var(--v-primary-base);
  * {
    vertical-align: middle;
  }
  .v-icon {
    color: var(--v-secondary-base);
  }
}
</style>
