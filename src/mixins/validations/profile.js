import { validationMixin } from 'vuelidate'
import {
  required,
  url,
  alphaNum,
  minLength,
  decimal,
  integer
} from 'vuelidate/lib/validators'
import { languages } from '@/i18n'

const exactLength = param => value => value.length === param
const validLang = value => languages.indexOf(value) !== -1
const min = param => value => value >= param

const getDefaultData = () => ({
  name: '',
  url: '',
  apiKey: '',
  darkMode: false,
  language: 'en',
  extraIssueId: null,
  timerApproximation: 0.25,
  dayHour: 8,
  workingDays: 5
})

export default {
  data: () => ({
    form: Object.assign({}, getDefaultData())
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
      },
      language: {
        required,
        validLang
      },
      timerApproximation: {
        required,
        decimal
      },
      dayHour: {
        required,
        integer,
        min: min(1)
      },
      workingDays: {
        required,
        integer,
        min: min(1)
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
    },
    languageErrors() {
      const errors = []
      if (!this.$v.form.language.$dirty) return errors
      if (!this.$v.form.language.required) errors.push('is required')
      if (!this.$v.form.language.validLang) errors.push('not valid language')
      return errors
    },
    timerApproximationErrors() {
      const errors = []
      if (!this.$v.form.timerApproximation.$dirty) return errors
      if (!this.$v.form.timerApproximation.required) errors.push('is required')
      if (!this.$v.form.timerApproximation.decimal)
        errors.push('not valid number')
      return errors
    },
    dayHourErrors() {
      const errors = []
      if (!this.$v.form.dayHour.$dirty) return errors
      if (!this.$v.form.dayHour.required) errors.push('is required')
      if (!this.$v.form.dayHour.integer) errors.push('not valid number')
      if (!this.$v.form.dayHour.min)
        errors.push('number should be greater then 1')
      return errors
    },
    workingDaysErrors() {
      const errors = []
      if (!this.$v.form.workingDays.$dirty) return errors
      if (!this.$v.form.workingDays.required) errors.push('is required')
      if (!this.$v.form.workingDays.integer) errors.push('not valid number')
      if (!this.$v.form.workingDays.min)
        errors.push('number should be greater then 1')
      return errors
    }
  },
  methods: {
    resetForm() {
      this.form = Object.assign(this.form, getDefaultData())
      this.$v.$reset()
    }
  }
}
