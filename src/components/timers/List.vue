<template>
  <div>
    <v-list three-line>
      <v-list-tile v-for="timer in items" :key="timer.issueId">
        <v-list-tile-content>
          <v-list-tile-title>{{ timer.issueId }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <single-timer :issue="timer.issueId" @save="askToSave" />
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <save-timer-modal v-model="showSaveModal" :issue="issueTimerToSave" />
  </div>
</template>

<script>
import SingleTimer from './Single'
import SaveTimerModal from './Save'

export default {
  components: {
    SingleTimer,
    SaveTimerModal
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    showSaveModal: false,
    issueTimerToSave: null
  }),
  methods: {
    askToSave(issue) {
      this.issueTimerToSave = issue
      this.showSaveModal = true
    }
  }
}
</script>
