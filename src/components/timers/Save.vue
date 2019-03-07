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
            Save time spent on issue #{{ relatedIssue.id }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click.native="cancel()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="headline">
          <div>
            {{ relatedIssue.subject }}
          </div>
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
              :items="activites"
              item-text="name"
              item-value="id"
              label="Activity"
            />
          </div>
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
import timeEntryValidation from '@/mixins/validations/timeEntry'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [timeEntryValidation],
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    issue: {
      type: Number,
      default: () => ({})
    }
  },
  data: () => ({
    loading: true,
    relatedIssue: {}
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
        this.loading = true
        this.loadIssue(this.issue).then(issue => {
          this.relatedIssue = issue
          this.form.isseId = issue.id
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
      saveTimeEntry: 'timeEntry/add',
      loadIssue: 'issue/loadSingle'
    }),
    validateForm() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.save()
      }
    },
    cancel() {
      this.isOpen = false
      this.$emit('canceled')
    },
    async save() {
      this.loading = true
      await this.saveTimeEntry(this.form)
      this.loading = false
      this.$emit('saved', this.form)
      this.$emit('input', false)
    }
  }
}
</script>
