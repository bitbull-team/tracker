<template>
  <div>
    <h4>{{ $t('Running:') }}</h4>
    <p v-if="!runningTimer">
      <router-link :to="{ name: 'issues' }">
        {{ $t('There is no running timer. Please choose an issue to start.') }}
      </router-link>
    </p>
    <running-timer
      v-if="runningTimer !== undefined"
      :timer="runningTimer"
      @stop="saveTimer(runningTimer)"
    />
    {{ $t('New Timer for extra:') }}
    <div>
      <v-btn
        v-if="$store.state.profile.current.extraIssueId !== null"
        icon
        @click="startExtraTimer($store.state.profile.current.extraIssueId)"
      >
        <v-icon>play_arrow</v-icon>
      </v-btn>
    </div>
    <h4 v-if="pausedTimers.length > 0">
      {{ $t('Paused:') }}
    </h4>

    <issues :items="issues" :disable="loading" />

    <div v-for="timer in pausedTimers" :key="timer.id">
      <paused-timer :timer="timer" @stop="saveTimer(timer)" />
    </div>

    <summary-report :entries="dailyEntries" type="day" />

    <save-timer
      v-model="modalSaveTimer"
      :timer="timerToSave"
      @saved="savedTimer(timerToSave)"
    />
  </div>
</template>

<script>
import RunningTimer from '@/components/timers/Running'
import PausedTimer from '@/components/timers/Paused'
import SaveTimer from '@/components/timers/Save'
import SummaryReport from '@/components/reports/Summary'
import Issues from '@/components/issues/List'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    RunningTimer,
    PausedTimer,
    SaveTimer,
    SummaryReport,
    Issues
  },
  data: () => ({
    loading: false,
    timerToSave: {},
    modalSaveTimer: false,
    filters: {
      status_id: 'open',
      assigned_to_id: 'me',
      project_id: null
    },
    issues: []
  }),
  computed: {
    ...mapGetters({
      runningTimer: 'timer/getRunning',
      pausedTimers: 'timer/getPaused',
      sortBy: 'issue/sortBy'
    }),
    dailyEntries() {
      return this.$store.state.timeEntry.todayItems
    }
  },
  async mounted() {
    this.loading = true
    await this.loadTodayEntries()
    this.loadIssuesWithFilters()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTodayEntries: 'timeEntry/loadToday',
      executeStart: 'timer/start',
      loadIssues: 'issue/loadWithFilter'
    }),
    saveTimer(timer) {
      this.timerToSave = timer
      this.modalSaveTimer = true
    },
    savedTimer(timer) {
      this.timerToSave = {}
    },
    startExtraTimer(issueId) {
      this.executeStart({
        issueId: issueId
      })
    },
    async loadIssuesWithFilters() {
      this.loading = true
      await this.loadIssues(this.filters)
      this.issues = this.sortBy('priority', true).slice(0, 4)
      this.loading = false
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
h4 {
  text-align: left;
  margin: 0 0 1rem;
}
</style>
