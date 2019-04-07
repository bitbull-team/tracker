<template>
  <form novalidate @submit.prevent="$emit('submit')">
    <v-switch
      v-model="form.darkMode"
      class="ml-1"
      name="darkMode"
      :disabled="loading"
      :label="`Dark theme`"
    />
    <v-select
      v-model="form.language"
      :items="languages"
      :error-messages="languageErrors"
      label="Language"
      name="language"
      :disabled="loading"
      @change="$v.form.language.$touch()"
    />
  </form>
</template>

<script>
import profileValidation from '@/mixins/validations/profile'
import availableLanguages from '@/mixins/availableLanguages'

export default {
  mixins: [profileValidation, availableLanguages],
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
  watch: {
    form: {
      handler(newValue) {
        this.value = Object.assign(this.value, this.form)
      },
      deep: true
    },
    value: {
      handler(newValue) {
        this.form = Object.assign(this.form, newValue)
      },
      deep: true
    }
  },
  methods: {
    validate() {
      this.$v.$touch()
      return this.isValid()
    },
    isValid() {
      return this.languageErrors.length === 0
    }
  }
}
</script>
