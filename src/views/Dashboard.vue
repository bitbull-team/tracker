<template>
  <div>
    <time-tracker />
    <time-tracked-this-week />
    <issues :items="allMyIssues" />
    <v-btn @click="sendTestNotification">
      Send
    </v-btn>
  </div>
</template>

<script>
import TimeTracker from '@/components/dashboard/TimeTracker'
import TimeTrackedThisWeek from '@/components/dashboard/TimeTrackedThisWeek'
import Issues from '@/components/issues/List'
import { mapActions } from 'vuex'

export default {
  components: {
    TimeTracker,
    TimeTrackedThisWeek,
    Issues
  },
  data() {
    return {
      allMyIssues: []
    }
  },
  async mounted() {
    this.allMyIssues = await this.loadMyIssues()
  },
  methods: {
    ...mapActions({
      sendNotification: 'notification/send',
      loadMyIssues: 'issue/loadAllMy'
    }),
    sendTestNotification() {
      this.sendNotification({
        title: 'test',
        options: {
          subtitle: 'Prova subtitle',
          body: 'Prova body'
        },
        callback: () => {
          //NOTE: only works with system notification
          //console.log('ok')
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
