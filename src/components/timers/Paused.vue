<template>
  <v-layout row align-center>
    <v-flex>
      <time-view :duration="timer.duration" />
    </v-flex>
    <v-flex>
      <timer-commands :issue="timer.issueId" :running="false" />
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
  }
}
</script>
