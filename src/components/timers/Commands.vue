<template>
  <v-layout row align-center>
    <v-flex>
      <v-btn v-if="showStop === true" text icon @click="stop()">
        <v-icon>stop</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn v-if="running === false" text icon @click="start()">
        <v-icon>play_arrow</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn v-if="running === true" text icon @click="pause()">
        <v-icon>pause</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn v-if="showDelete === true" text icon @click="discard()">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    issue: {
      type: Number,
      default: () => undefined
    },
    running: {
      type: Boolean,
      default: () => false
    },
    showStop: {
      type: Boolean,
      default: () => true
    },
    showDelete: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    ...mapActions({
      executeStart: 'timer/start',
      executePause: 'timer/pause',
      executeDiscard: 'timer/discard'
    }),
    stop() {
      this.$emit('stop')
    },
    start() {
      this.executeStart({
        issueId: this.issue
      })
      this.$emit('start')
    },
    pause() {
      this.executePause({
        issueId: this.issue
      })
      this.$emit('pause')
    },
    discard() {
      this.executeDiscard({
        issueId: this.issue
      })
      this.$emit('discard')
    }
  }
}
</script>
