<template>
  <v-list three-line>
    <issue v-for="issue in items" :key="issue.id" :issue="issue" />
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'
import Issue from './Issue'

export default {
  components: {
    Issue
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
