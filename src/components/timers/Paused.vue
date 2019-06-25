<template>
  <v-layout row align-center timer>
    <v-flex>
      <strong class="date">{{
        timer.startedAt | moment('DD MMM YYYY')
      }}</strong>
      <span class="issue">{{ timer.issueId }}</span>
      <em class="comments">{{ timer.comments }}</em>
    </v-flex>
    <v-flex>
      <time-view :duration="timer.duration" />
    </v-flex>
    <v-flex>
      <timer-commands
        :id="timer.id"
        :running="false"
        :show-play="showPlay"
        @stop="$emit('stop')"
      />
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
  computed: {
    showPlay() {
      let today = moment().startOf('day')
      let issueDate = moment(this.timer.startedAt).startOf('day')
      return issueDate.isSame(today, 'd')
    }
  }
}
</script>

<style lang="scss" scoped>
.timer {
  background-color: var(--v-line-lighten);
  border-radius: 10px;
  margin-bottom: 0.5rem;
  padding: 1rem;
}
.date {
  display: block;
  font-weight: bold;
}
.issue {
  display: block;
}
.comment {
  display: block;
  font-style: italic;
}
</style>
