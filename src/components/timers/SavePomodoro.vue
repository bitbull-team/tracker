<template>
  <v-dialog
    v-model="isOpen"
    :persistent="true"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="800"
  >
    <form novalidate @submit.prevent="validateForm">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            Save Pomodoro on issue
            <span v-if="relatedIssue">#{{ relatedIssue.id }}</span>
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click.native="cancel()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="headline">
          <issue-selector
            v-model="relatedIssue"
            :error-messages="issueIdErrors"
            @change="form.issueId = relatedIssue ? relatedIssue.id : null"
          />
          <div>
            <v-textarea
              v-model="form.comments"
              solo
              :disabled="loading"
              :error-messages="commentsErrors"
              name="comments"
              label="Description"
              @input="$v.form.comments.$touch()"
              @blur="$v.form.comments.$touch()"
            />
            <v-select
              v-model="form.activityId"
              :items="activites"
              item-text="name"
              item-value="id"
              label="Activity"
              :error-messages="issueIdErrors"
            />
          </div>
          <v-select
            v-model="form.hours"
            :items="pomodoroList"
            label="Time"
            :error-messages="hoursErrors"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" flat :disabled="loading" @click="cancel()">
            Cancel
          </v-btn>
          <v-btn flat :loading="loading" @click="validateForm()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import issueSelector from '@/components/issues/Selector'
import pomodoroValidation from '@/mixins/validations/pomodoro'
import availablePomodoro from '@/mixins/availablePomodoro'

export default {
  components: {
    issueSelector
  },
  mixins: [pomodoroValidation, availablePomodoro],
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    issueId: {
      type: Number,
      default: () => null
    },
    hours: {
      type: Number,
      default: () => null
    }
  },
  data: () => ({
    loading: false,
    relatedIssue: {},
    activityId: null
  }),
  computed: {
    ...mapState({
      activites: state => state.timeEntryActivity.items
    }),
    isOpen: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        if (this.issueId === undefined || this.issueId === null) {
          this.relatedIssue = null
          return
        }
        this.loading = true
        this.loadIssue(this.issueId).then(issue => {
          this.relatedIssue = issue
          this.form.issueId = issue.id
          this.form.comments = ''
          this.form.hours = this.hours
          this.form.activityId = this.activityId
          this.loading = false
        })
      } else {
        this.loading = false
        this.resetForm()
      }
    }
  },
  methods: {
    ...mapActions({
      savePomodoro: 'pomodoro/record',
      loadIssue: 'issue/loadSingle'
    }),
    validateForm() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.save()
      }
    },
    cancel() {
      this.$emit('input', false)
      this.$emit('canceled')
    },
    async save() {
      this.loading = true
      try {
        await this.savePomodoro(this.form)
      } catch (error) {
        /*eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error)
      }

      this.loading = false
      this.$emit('saved', this.form)
      this.$emit('input', false)
    }
  }
}
</script>
