<template>
  <v-layout row align-center>
    <v-flex>
      <v-btn v-if="showStop === true" text icon @click="stop()">
        <v-icon>stop</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn
        v-if="running === false && showPlay === true"
        text
        icon
        @click="start()"
      >
        <v-icon>play_arrow</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn v-if="running === true" text icon @click="pause()">
        <v-icon>pause</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn v-if="showDelete === true" text icon @click="askToDiscard()">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-flex>
    <confirm-modal
      v-model="showConfirmModal"
      message="Are your sure to want to delete this timer?"
      @confirmed="discard"
    />
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import ConfirmModal from '@/components/ConfirmModal'

export default {
  components: {
    ConfirmModal
  },
  props: {
    id: {
      type: Number,
      default: () => undefined
    },
    running: {
      type: Boolean,
      default: () => false
    },
    showPlay: {
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
  data: () => ({
    showConfirmModal: false
  }),
  methods: {
    ...mapActions({
      executeResume: 'timer/resume',
      executePause: 'timer/pause',
      executeDiscard: 'timer/discard'
    }),
    stop() {
      this.$emit('stop')
    },
    start() {
      this.executeResume(this.id)
      this.$emit('start')
    },
    pause() {
      this.executePause(this.id)
      this.$emit('pause')
    },
    askToDiscard() {
      this.showConfirmModal = true
    },
    discard() {
      this.executeDiscard(this.id)
      this.$emit('discard')
    }
  }
}
</script>
