<template>
  <div>
    <p v-if="!runningTimer">
      <router-link :to="{ name: 'issues' }">
        {{ $t('There is no running timer. Please choose an issue to start.') }}
      </router-link>
    </p>
    <current-timer
      v-if="runningTimer !== undefined"
      :timer="runningTimer"
      @stop="saveTimer(runningTimer)"
    />

    <generic-timer />

    <v-layout row wrap>
      <v-flex xs5>
        <v-select
          v-model="tasksShown"
          :items="totalTasks"
          :label="$t('Show last N tasks')"
          @change="setTasksNumber"
        />
      </v-flex>
      <v-flex xs6>
        <v-select
          v-model="sortedBy"
          :items="sorting"
          :label="$t('Ordered by')"
          @change="sort"
        />
      </v-flex>
      <v-flex xs1 class="text-xs-right">
        <v-icon class="pt-4" @click="invertOrder">
          sort
        </v-icon>
      </v-flex>
    </v-layout>

    <issues
      :items="issuesSortBy(sortedBy, sortDirection).slice(0, tasksShown)"
      :disable="loading"
    />

    <h4 v-if="pausedTimers.length > 0">
      {{ $t('Paused:') }}
    </h4>

    <div v-for="timer in pausedTimers" :key="timer.id">
      <paused-timer :timer="timer" @stop="saveTimer(timer)" />
    </div>

    <summary-report :entries="dailyEntries" type="day" :approximate="false" />

    <save-timer
      v-model="modalSaveTimer"
      :timer="timerToSave"
      @saved="savedTimer(timerToSave)"
    />
  </div>
</template>

<script>
import CurrentTimer from '@/components/timers/Running'
import PausedTimer from '@/components/timers/Paused'
import SaveTimer from '@/components/timers/Save'
import GenericTimer from '@/components/timers/Generic'
import SummaryReport from '@/components/reports/Summary'
import Issues from '@/components/issues/List'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CurrentTimer,
    PausedTimer,
    SaveTimer,
    GenericTimer,
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
    issues: [],
    sortedBy: 'priority',
    sortDirection: true,
    sorting: ['start_date', 'priority'],
    totalTasks: ['3', '5', '10'],
    tasksShown: 5
  }),
  computed: {
    ...mapGetters({
      runningTimer: 'timer/getRunning',
      pausedTimers: 'timer/getPaused',
      issuesSortBy: 'issue/sortBy'
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
      loadIssues: 'issue/loadWithFilter'
    }),
    saveTimer(timer) {
      this.timerToSave = timer
      this.modalSaveTimer = true
    },
    savedTimer(timer) {
      this.timerToSave = {}
    },
    async loadIssuesWithFilters() {
      this.loading = true
      await this.loadIssues(this.filters)
      this.loading = false
    },
    sort(order) {
      this.sortedBy = order
    },
    invertOrder() {
      this.sortDirection = !this.sortDirection
    },
    setTasksNumber(num) {
      this.tasksShown = num
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
