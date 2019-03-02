<template>
  <div>
    <time-tracked-this-week />
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

<style lang="stylus" scoped>
div {
  width 100%
}
</style>
