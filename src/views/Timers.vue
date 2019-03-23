<template>
  <div>
    Running:
    <running-timer v-if="runningTimer !== undefined" :timer="runningTimer" />
    Paused:
    <div v-for="timer in pausedTimers" :key="timer.issueId">
      <paused-timer :timer="timer" />
    </div>
  </div>
</template>

<script>
import RunningTimer from '@/components/timers/Running'
import PausedTimer from '@/components/timers/Paused'
import { mapGetters } from 'vuex'

export default {
  components: {
    RunningTimer,
    PausedTimer
  },
  computed: {
    ...mapGetters({
      runningTimer: 'timer/getRunning',
      pausedTimers: 'timer/getPaused'
    })
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
