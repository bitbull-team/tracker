<template>
  <v-layout row column>
    <v-flex>
      <h4>{{ $t('This week you worked for') }}</h4>
    </v-flex>
    <v-flex>
      <v-progress-circular
        style="height: 10em; width: 100%;"
        color="primary"
        :value="donePercentage"
        :rotate="-90"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    circle: 310
  }),
  computed: {
    taskList() {
      return this.$store.state.timeEntry.thisWeekItems
    },
    totalHours() {
      return Math.round(
        this.taskList.reduce(
          (tot, trakedTime) => tot + parseFloat(trakedTime.hours),
          0
        )
      )
    },
    donePercentage() {
      let totWeekHour =
        (this.$store.state.profile.current.workingDays || 5) *
        (this.$store.state.profile.current.dayHour || 8)
      return (this.totalHours * 100) / totWeekHour
    }
  },
  async mounted() {
    this.loading = true
    await this.loadTimeEntries()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTimeEntries: 'timeEntry/loadThisWeek'
    })
  }
}
</script>
