<template>
  <div>
    <time-tracked-this-week />
    <time-tracked-today />
  </div>
</template>

<script>
import TimeTrackedThisWeek from '@/components/dashboard/TimeTrackedThisWeek'

export default {
  components: {
    TimeTrackedThisWeek
  }
}
</script>
