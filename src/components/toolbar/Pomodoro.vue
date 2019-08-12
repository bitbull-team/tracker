<template>
  <div class="text-xs-center">
    <v-btn icon flat class="transparent">
      <v-icon @click="openModal()">
        av_timer
      </v-icon>
    </v-btn>

    <save-pomodoro
      v-model="$store.state.pomodoro.modalOpen"
      :issue-id="$store.state.pomodoro.issueId"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SavePomodoro from '@/components/timers/SavePomodoro'

export default {
  components: {
    SavePomodoro
  },
  methods: {
    ...mapActions({
      startTimer: 'pomodoro/record',
      openModal: 'pomodoro/openModal'
    })
  }
}
</script>
