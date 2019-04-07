<template>
  <form novalidate @submit.prevent="$emit('submit')">
    <issue-selector
      v-model="extraIssue"
      :disabled="loading"
      @change="form.extraIssueId = extraIssue ? extraIssue.id : null"
    />
    <v-select
      v-model="form.timerApproximation"
      :items="availableTimerApproximation"
      :error-messages="timerApproximationErrors"
      item-text="name"
      item-value="value"
      name="timerApproximation"
      :disabled="loading"
      @change="$v.form.timerApproximation.$touch()"
    />
    <v-text-field
      v-model="form.dayHour"
      :error-messages="dayHourErrors"
      name="dayHour"
      label="Day working hour"
      :disabled="loading"
      @input="$v.form.dayHour.$touch()"
      @blur="$v.form.dayHour.$touch()"
    />
    <v-text-field
      v-model="form.workingDays"
      :error-messages="workingDaysErrors"
      name="workingDays"
      label="Working days by week"
      :disabled="loading"
      @input="$v.form.workingDays.$touch()"
      @blur="$v.form.workingDays.$touch()"
    />
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import profileValidation from '@/mixins/validations/profile'
import availableTimerApproximation from '@/mixins/availableTimerApproximation'
import IssueSelector from '@/components/issues/Selector'

export default {
  components: {
    IssueSelector
  },
  mixins: [profileValidation, availableTimerApproximation],
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
  data: () => ({
    extraIssue: null
  }),
  watch: {
    form: {
      async handler(newValue) {
        if (this.form.extraIssueId != null && this.extraIssue === null) {
          this.extraIssue = await this.loadIssue(this.form.extraIssueId)
        }

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
    ...mapActions({
      loadIssue: 'issue/loadSingle'
    }),
    validate() {
      this.$v.$touch()
      return this.isValid()
    },
    isValid() {
      return (
        this.timerApproximationErrors.length === 0 ||
        this.dayHourErrors.length === 0 ||
        this.workingDaysErrors.length === 0
      )
    }
  }
}
</script>
