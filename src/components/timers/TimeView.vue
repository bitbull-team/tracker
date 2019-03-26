<template>
  <span> {{ hours }}:{{ minutes | twoDigit }}:{{ seconds | twoDigit }}</span>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    twoDigit: value => {
      if (value < 10) {
        return '0' + value
      }
      return value
    }
  },
  props: {
    duration: {
      type: Number,
      default: () => 0
    },
    running: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0
  }),
  watch: {
    duration(value) {
      if (isNaN(this.duration)) {
        value = 0
      }
      this.loadDuration(value)
    },
    running(value) {
      if (typeof variable !== 'boolean') {
        return
      }

      if (value === true) {
        this.run()
      } else {
        this.stop()
      }
    }
  },
  mounted() {
    this.loadDuration(isNaN(this.duration) === false ? this.duration : 0)
    if (this.running === true) {
      this.run()
    }
  },
  methods: {
    loadDuration(durationInSeconds) {
      const duration = moment.duration(durationInSeconds, 'seconds')
      this.hours = duration.get('hours')
      this.minutes = duration.get('minutes')
      this.seconds = duration.get('seconds')
    },
    run() {
      this.interval = setInterval(this.tick, 1000)
    },
    stop() {
      clearInterval(this.interval)
    },
    tick() {
      this.seconds++
      if (this.seconds === 60) {
        this.minutes++
        this.seconds = 0
      }
      if (this.minutes === 60) {
        this.hours++
        this.minutes = 0
      }
    }
  }
}
</script>
