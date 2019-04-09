<template>
  <div class="timer">
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
    <v-progress-linear
      v-if="progress"
      v-model="progress"
      :color="status"
      height="6"
    />
    <v-progress-linear
      v-if="progress"
      v-model="done_ratio"
      height="3"
      color="primary"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    duration: 0,
    estimated_hours: 0,
    spent_hours: 0,
    done_ratio: 0
  }),
  computed: {
    progress() {
      if (this.getProgress() > 100) return this.getProgress() - 100
      return this.getProgress()
    },
    status() {
      if (this.getProgress() > 100) return 'warning'
      if (this.getProgress() > 150) return 'error'
      return 'success'
    }
  },
  watch: {
    timer() {
      this.loadDuration()
    }
  },
  mounted() {
    this.loadDuration()
    this.loadIssue(this.timer.issueId).then(issue => {
      this.estimated_hours = issue.estimated_hours
      this.spent_hours = issue.spent_hours
      this.done_ratio = issue.done_ratio
    })
  },
  methods: {
    ...mapActions({
      loadIssue: 'issue/loadSingle'
    }),
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
    },
    getProgress() {
      if (!this.estimated_hours) return false
      if (this.spent_hours === 0) return 0
      return Math.round(this.spent_hours * (100 / this.estimated_hours))
    }
  }
}
</script>

<style lang="scss">
.v-progress-linear {
  margin: 0 0 4px;
}
</style>

<style lang="scss" scoped>
.timer {
  background-color: var(--v-line-lighten);
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1rem;
}
</style>
