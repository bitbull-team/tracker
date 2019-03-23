export default {
  computed: {
    languages() {
      return Object.keys(this.$i18n.messages)
    }
  }
}
