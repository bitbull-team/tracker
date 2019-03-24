<template>
  <v-layout row wrap>
    <summary-report :entries="daylyEntries" type="day" />
    <summary-report :entries="weeklyEntries" type="week" />
    <summary-report :entries="monthlyEntries" type="month" />
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import SummaryReport from '@/components/reports/Summary'

export default {
  components: {
    SummaryReport
  },
  computed: {
    daylyEntries() {
      return this.$store.state.timeEntry.todayItems
    },
    weeklyEntries() {
      return this.$store.state.timeEntry.thisWeekItems
    },
    monthlyEntries() {
      return this.$store.state.timeEntry.thisMonthItems
    }
  },
  async mounted() {
    this.loading = true
    await this.loadTodayEntries()
    await this.loadWeekEntries()
    await this.loadMonthEntries()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTodayEntries: 'timeEntry/loadToday',
      loadWeekEntries: 'timeEntry/loadThisWeek',
      loadMonthEntries: 'timeEntry/loadThisMonth'
    })
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-around;
}
</style>
