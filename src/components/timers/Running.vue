<template>
  <div class="timer">
    <p class="issue">
      {{ subject }}
    </p>
    <v-layout row align-center>
      <v-flex>{{ timer.issueId }}</v-flex>
      <v-flex>
        <time-view :duration="duration" :running="true" />
      </v-flex>
      <v-flex>
        <timer-commands :id="timer.id" :running="true" @stop="$emit('stop')" />
      </v-flex>
    </v-layout>

    <v-text-field v-model="comment" :label="$t('Add a comment')" />

    <v-tooltip v-if="progress !== false" top>
      <template v-slot:activator="{ on }">
        <v-progress-linear
          v-model="progress"
          :color="status"
          height="6"
          dark
          v-on="on"
        />
      </template>
      <span>
        ({{ progressPercent }}%) {{ spent_hours }} {{ $t('hours on') }}
        {{ estimated_hours }}
        {{ $t('estimated') }}
      </span>
    </v-tooltip>
    <v-progress-linear
      v-if="progress !== false"
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
import debounce from 'debounce'

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
    done_ratio: 0,
    subject: '',
    comment: ''
  }),
  computed: {
    progressPercent() {
      if (!this.estimated_hours) return false
      if (this.spent_hours === 0) return 0
      return Math.round(this.spent_hours * (100 / this.estimated_hours))
    },
    progress() {
      if (this.progressPercent > 100) return this.progressPercent - 100
      return this.progressPercent
    },
    status() {
      if (this.progressPercent > 100) return 'warning'
      if (this.progressPercent > 150) return 'error'
      return 'success'
    }
  },
  watch: {
    timer() {
      this.loadDuration()
    },
    comment: debounce(async function() {
      if (this.comment !== this.timer.comments) {
        this.updateTimer({ id: this.timer.id, comments: this.comment })
      }
    }, 800)
  },
  mounted() {
    this.loadDuration()
    this.loadIssue(this.timer.issueId).then(issue => {
      this.estimated_hours = issue.estimated_hours
      this.spent_hours = issue.spent_hours
      this.done_ratio = issue.done_ratio
      this.subject = issue.subject
      this.comment = this.timer.comments
    })
  },
  methods: {
    ...mapActions({
      loadIssue: 'issue/loadSingle',
      updateTimer: 'timer/update'
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
.issue {
  margin: 0;
  font-weight: bold;
  color: var(--v-secondary-base);
  text-transform: uppercase;
  font-size: 0.8em;
}
</style>
