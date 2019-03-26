import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

const getDefaultData = () => ({
  issueId: null,
  activityId: null,
  comments: null
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
    }
  },
  methods: {
    resetForm() {
      this.form = Object.assign(this.form, getDefaultData())
      this.$v.$reset()
    }
  }
}
