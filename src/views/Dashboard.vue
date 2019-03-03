<template>
  <div>
    <time-tracked-this-week/>
    <v-btn @click="sendTestNotification">Send</v-btn>
  </div>
</template>

<script>
import TimeTrackedThisWeek from '@/components/dashboard/TimeTrackedThisWeek'
import { mapActions } from 'vuex'

export default {
  components: {
    TimeTrackedThisWeek
  },
  methods: {
    ...mapActions({
      sendNotification: 'notification/send'
    }),
    sendTestNotification() {
      this.sendNotification({
        title: 'test',
        options: {
          subtitle: 'Prova subtitle',
          body: 'Prova body'
        },
        callback: () => {
          console.log('ok')
        }
      })
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
