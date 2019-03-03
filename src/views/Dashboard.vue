<template>
  <div>
    <time-tracked-this-week/>
    <v-btn @click="sendNotification">Send</v-btn>
  </div>
</template>

<script>
import TimeTrackedThisWeek from '@/components/dashboard/TimeTrackedThisWeek'

export default {
  components: {
    TimeTrackedThisWeek
  },
  methods: {
    sendNotification() {
      this.$systemNotify.send(
        'test',
        () => {
          console.log('clicked')
        },
        {
          subtitle: 'Prova subtitle',
          body: 'Prova body'
        }
      )
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
