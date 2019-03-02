<template>
  <div>
    tracked time
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false
  }),
  async mounted() {
    this.loading = true
    await this.loadThisWeek()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadThisWeek: 'timeEntries/loadThisWeek'
    })
  }
}
</script>
