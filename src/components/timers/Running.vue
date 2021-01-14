<template>
  <div class="timer">
    <p class="issue">
      {{ subject }}
    </p>
    <v-layout row align-center>
      <v-flex>
        <span v-show="!newId" @click="editIssueId">{{ timer.issueId }}</span>
        <input
          v-show="newId"
          ref="issueId"
          v-model="newId"
          pattern="[0-9]"
          :size="newId.length"
          class="timer__newid"
          title="Press Enter to confirm"
          @keypress.enter="updateIssueId"
        />
      </v-flex>
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
        ({{ progressPercent }}%) {{ current_spent }} {{ $t('hours on') }}
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
import { mapActions, mapMutations } from 'vuex'
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
    current_spent: 0,
    done_ratio: 0,
    subject: '',
    comment: '',
    newId: 0
  }),
  computed: {
    progressPercent() {
      if (!this.estimated_hours) return false
      if (this.current_spent === 0) return 0
      return Math.round(this.current_spent * (100 / this.estimated_hours))
    },
    progress() {
      if (this.progressPercent > 100) return this.progressPercent - 100
      return this.progressPercent
    },
    status() {
      if (this.progressPercent > 100 && this.progressPercent < 150)
        return 'warning'
      if (this.progressPercent >= 150) return 'error'
      return 'success'
    },
    currentTimeRunning() {
      return (this.duration / 60 / 60).toFixed(2)
    }
  },
  watch: {
    timer() {
      this.loadDuration()
      this.loadIssue(this.timer.issueId).then(issue => {
        this.estimated_hours = issue.estimated_hours
        this.spent_hours = issue.spent_hours
        this.done_ratio = issue.done_ratio
        this.subject = issue.subject
        this.comment = this.timer.comments
        this.updateTimeSpent()
      })
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
      this.updateTimeSpent()
    })
    setInterval(
      function() {
        this.updateTimeSpent()
      }.bind(this),
      300000
    )
  },
  methods: {
    ...mapMutations({
      updateTimeEntry: 'timer/overrideItem'
    }),
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
    },
    editIssueId() {
      this.newId = this.timer.issueId
      this.$refs.issueId.focus()
    },
    async updateIssueId() {
      this.updateTimeEntry({ id: this.timer.id, issueId: this.newId })
      this.newId = null
      await this.$store.dispatch(
        'notification/send',
        {
          title: `Updated the issue ID for this running time`
        },
        { root: true }
      )
    },
    updateTimeSpent() {
      this.loadDuration()
      this.current_spent =
        parseFloat(this.currentTimeRunning) + parseFloat(this.spent_hours)
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
  &__newid:focus {
    outline: none;
    background-color: white;
    padding: 0 5px;
    text-align: center;
  }
}
.issue {
  margin: 0;
  font-weight: bold;
  color: var(--v-secondary-base);
  text-transform: uppercase;
  font-size: 0.8em;
}
</style>
