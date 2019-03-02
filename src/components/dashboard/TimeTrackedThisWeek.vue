<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.timeEntries.thisWeekItems"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item.project.name }}</td>
      <td class="text-xs-center">
        {{ props.item.issue ? props.item.issue.id : '--NO ISSUE ASSIGNED--' }}
      </td>
      <td class="text-xs-center">{{ props.item.hours }}</td>
      <td class="text-xs-center">{{ props.item.comments }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    headers: [
      { text: 'Project', value: 'name', align: 'center' },
      { text: 'Issue', value: 'id', align: 'center' },
      { text: 'Hours', value: 'hours', align: 'center' },
      { text: 'Comment', value: 'comments', align: 'center' }
    ]
  }),
  async mounted() {
    this.loading = true
    await this.loadTimeEntries()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTimeEntries: 'timeEntries/loadThisWeek'
    })
  }
}
</script>
