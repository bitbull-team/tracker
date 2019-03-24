<template>
  <form novalidate @submit.prevent="$emit('submit')" />
</template>

<script>
import profileValidation from '@/mixins/validations/profile'

export default {
  mixins: [profileValidation],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    isValid() {
      return true
    }
  },
  watch: {
    form: {
      handler(newValue) {
        this.value = Object.assign(this.value, this.form)
      },
      deep: true
    }
  },
  methods: {
    validate() {
      this.$v.$touch()
      return this.formValid
    }
  }
}
</script>
