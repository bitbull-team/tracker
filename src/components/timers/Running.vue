<template>
  <v-layout row align-center>
    <v-flex>
      {{ timer.issueId }}
    </v-flex>
    <v-flex>
      <time-view :duration="duration" :running="true" />
    </v-flex>
    <v-flex>
      <timer-commands :id="timer.id" :running="true" @stop="$emit('stop')" />
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import TimeView from '@/components/timers/TimeView'
import TimerCommands from '@/components/timers/Commands'

export default {
  components: {
    TimeView,
    TimerCommands
  },
  props: {
    timer: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    duration: 0
  }),
  watch: {
    timer() {
      this.loadDuration()
    }
  },
  mounted() {
    this.loadDuration()
  },
  methods: {
    loadDuration() {
      if (this.timer.resumedAt !== undefined) {
        this.duration =
          moment.duration(moment().diff(this.timer.resumedAt)).as('seconds') +
          this.timer.duration
      } else {
        this.duration = moment
          .duration(moment().diff(this.timer.startedAt))
          .as('seconds')
      }
    }
  }
}
</script>
