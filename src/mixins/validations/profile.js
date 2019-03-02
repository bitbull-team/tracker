import { validationMixin } from 'vuelidate'
import { required, url, alphaNum, minLength } from 'vuelidate/lib/validators'

const exactLength = param => value => value.length === param

export default {
  data: () => ({
    form: {
      name: '',
      url: '',
      apiKey: ''
    }
  }),
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4)
      },
      url: {
        required,
        url
      },
      apiKey: {
        required,
        alphaNum,
        exactLength: exactLength(40)
      }
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      if (!this.$v.form.name.required) errors.push('is required')
      if (!this.$v.form.name.minLength) errors.push('too short')
      return errors
    },
    urlErrors() {
      const errors = []
      if (!this.$v.form.url.$dirty) return errors
      if (!this.$v.form.url.required) errors.push('is required')
      if (!this.$v.form.url.url) errors.push('should be a valid URL')
      return errors
    },
    apiKeyErrors() {
      const errors = []
      if (!this.$v.form.apiKey.$dirty) return errors
      if (!this.$v.form.apiKey.required) errors.push('is required')
      if (!this.$v.form.apiKey.alphaNum) errors.push('only letters and number')
      if (!this.$v.form.apiKey.exactLength) errors.push('invalid length')
      return errors
    }
  }
}
