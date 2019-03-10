<template>
  <v-layout row>
    <v-flex v-if="showButtons">
      <v-btn v-if="timer.isRunning" text icon @click="stop">
        <v-icon>stop</v-icon>
      </v-btn>
      <v-btn v-if="!timer.isRunning || timer.isPaused" text icon @click="start">
        <v-icon>play_arrow</v-icon>
      </v-btn>
      <v-btn v-if="timer.isRunning && !timer.isPaused" text icon @click="pause">
        <v-icon>pause</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      {{ `${h}:${min}:${sec}` }}
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    issue: {
      type: Number,
      default: () => null
    }
  },
  data: () => ({
    showButtons: true,
    timer: {},
    hour: 0,
    minute: 0,
    second: 0
  }),
  computed: {
    ...mapGetters({
      timerGetByIssue: 'timer/getByIssue'
    }),
    h() {
      if (this.hour < 10) {
        return '0' + this.hour
      }
      return this.hour
    },
    min() {
      if (this.minute < 10) {
        return '0' + this.minute
      }
      return this.minute
    },
    sec() {
      if (this.second < 10) {
        return '0' + this.second
      }
      return this.second
    }
  },
  async mounted() {
    if (this.issue) {
      this.timer = this.timerGetByIssue(this.issue)
      const duration = moment.duration(moment().diff(this.timer.start))
      this.hour = duration.get('hours')
      this.minute = duration.get('minutes')
      this.second = duration.get('seconds')
      this.showButtons = true
      if (this.timer.isRunning) {
        this.start()
      }
    }
  },
  methods: {
    ...mapActions({
      changeSystemTrayIcon: 'systemTray/changeIcon',
      timerStart: 'timer/start',
      timerPause: 'timer/pause',
      timerResume: 'timer/resume'
    }),
    start() {
      this.timer.isRunning = true
      this.timer.isPaused = false
      this._tick()
      this.interval = setInterval(this._tick, 1000)
      this.changeSystemTrayIcon('timerOn')
    },
    pause() {
      if (this.timer.isPaused) {
        this.start()
        return false
      }
      this.timer.isPaused = true
      clearInterval(this.interval)
    },
    stop() {
      this.timer.isRunning = false
      this.timer.isPaused = false
      this.showButtons = false
      clearInterval(this.interval)

      this.saveTime(this.hour, this.minute)
      this.changeSystemTrayIcon('timerOff')
    },
    _tick() {
      this.second++
      if (this.second === 60) {
        this.minute++
        this.second = 0
      }
      if (this.minute === 60) {
        this.hour++
        this.minute = 0
      }
    },
    saveTime() {
      this.$emit('save', this.issue)
    }
  }
}
</script>
