<template>
  <v-layout row column>
    <v-flex>
      <h4>{{ $t('Today you worked for') }}</h4>
    </v-flex>
    <v-flex>
      <v-progress-circular
        style="height: 10em; width: 100%;"
        color="primary"
        :value="donePercentage"
        :rotate="-90"
      />
    </v-flex>
    <v-flex>
      <v-data-table :headers="headers" :items="taskList" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-right">
            {{ props.item.project.name }}
          </td>
          <td class="text-xs-right">
            {{ props.item.issue.id }}
          </td>
          <td class="text-xs-right">
            {{ props.item.hours }}
          </td>
          <td class="text-xs-right">
            {{ props.item.comments }}
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    headers: [
      { text: 'Project' },
      { text: 'Issue' },
      { text: 'Hours' },
      { text: 'Comment' }
    ]
  }),
  computed: {
    taskList() {
      return this.$store.state.timeEntry.todayItems
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
      let totDayHour = this.$store.state.profile.current.dayHour || 8
      return (this.totalHours * 100) / totDayHour
    }
  },
  async mounted() {
    this.loading = true
    await this.loadTimeEntries()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTimeEntries: 'timeEntry/loadToday'
    })
  }
}
</script>
