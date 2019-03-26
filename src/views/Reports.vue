<template>
  <v-layout row wrap>
    <tracked-this-week />
    <tracked-today />
  </v-layout>
</template>

<script>
import TrackedThisWeek from '@/components/reports/TimeTrackedThisWeek'
import TrackedToday from '@/components/reports/TimeTrackedToday'

export default {
  components: {
    TrackedThisWeek,
    TrackedToday
  }
}
</script>
