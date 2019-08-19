import { validationMixin } from 'vuelidate'
import { required, decimal } from 'vuelidate/lib/validators'

const min = param => value => value >= param

const getDefaultData = () => ({
  issueId: null,
  activityId: null,
  comments: null,
  hours: 0
})

export default {
  data: () => ({
    form: Object.assign({}, getDefaultData())
  }),
  mixins: [validationMixin],
  validations: {
    form: {
      issueId: {
        required
      },
      activityId: {
        required
      },
      comments: {
        required
      },
      hours: {
        required,
        decimal,
        min: min(0.25)
      }
    }
  },
  computed: {
    issueIdErrors() {
      const errors = []
      if (!this.$v.form.issueId.$dirty) return errors
      if (!this.$v.form.issueId.required) errors.push('is required')
      return errors
    },
    activityIdErrors() {
      const errors = []
      if (!this.$v.form.activityId.$dirty) return errors
      if (!this.$v.form.activityId.required) errors.push('is required')
      return errors
    },
    commentsErrors() {
      const errors = []
      if (!this.$v.form.comments.$dirty) return errors
      if (!this.$v.form.comments.required) errors.push('is required')
      return errors
    },
    hoursErrors() {
      const errors = []
      if (!this.$v.form.hours.$dirty) return errors
      if (!this.$v.form.hours.required) errors.push('is required')
      if (!this.$v.form.hours.decimal) errors.push('should be a number')
      if (!this.$v.form.hours.min)
        errors.push('should be greater than 15 minutes')
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
