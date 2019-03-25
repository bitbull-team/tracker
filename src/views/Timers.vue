<template>
  <div>
    Running:
    <running-timer
      v-if="runningTimer !== undefined"
      :timer="runningTimer"
      @stop="saveTimer(runningTimer)"
    />
    Paused:
    <div v-for="timer in pausedTimers" :key="timer.issueId">
      <paused-timer :timer="timer" @stop="saveTimer(timer)" />
    </div>

    <save-timer
      v-model="modalSaveTimer"
      :issue="timerToSave.issueId"
      @saved="savedTimer(timerToSave)"
    />
  </div>
</template>

<script>
import RunningTimer from '@/components/timers/Running'
import PausedTimer from '@/components/timers/Paused'
import SaveTimer from '@/components/timers/Save'
import { mapGetters } from 'vuex'

export default {
  components: {
    RunningTimer,
    PausedTimer,
    SaveTimer
  },
  data: () => ({
    timerToSave: {},
    modalSaveTimer: false
  }),
  computed: {
    ...mapGetters({
      runningTimer: 'timer/getRunning',
      pausedTimers: 'timer/getPaused'
    })
  },
  methods: {
    saveTimer(timer) {
      this.timerToSave = timer
      this.modalSaveTimer = true
    },
    savedTimer(timer) {
      this.timerToSave = {}
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
