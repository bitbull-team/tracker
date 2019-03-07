<template>
  <v-layout row wrap>
    <v-flex xs12>
      <timers-list :items="timers" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import TimersList from '@/components/timers/List'

export default {
  components: {
    TimersList
  },
  computed: {
    ...mapState({
      timers: state => state.timer.items
    })
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
