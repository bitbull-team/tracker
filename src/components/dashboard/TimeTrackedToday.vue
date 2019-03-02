<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.timeEntries.todayItems"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-right">{{ props.item.project.name }}</td>
      <td class="text-xs-right">{{ props.item.issue.id }}</td>
      <td class="text-xs-right">{{ props.item.hours }}</td>
      <td class="text-xs-right">{{ props.item.comments }}</td>
    </template>
  </v-data-table>
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
  async mounted() {
    this.loading = true
    await this.loadTimeEntries()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTimeEntries: 'timeEntries/loadToday'
    })
  }
}
</script>
