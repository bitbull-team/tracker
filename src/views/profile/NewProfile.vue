<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <form novalidate @submit.prevent="validateForm">
        <v-card class="elevation-2">
          <v-card-title primary-title>
            <div>
              <div class="headline">
                Create new profile
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="form.name"
              :error-messages="nameErrors"
              name="name"
              label="Workspace name"
              :disabled="loading"
              @input="$v.form.name.$touch()"
              @blur="$v.form.name.$touch()"
            />
            <v-text-field
              v-model="form.url"
              :error-messages="urlErrors"
              name="url"
              label="Tracker URL"
              :disabled="loading"
              @input="$v.form.url.$touch()"
              @blur="$v.form.url.$touch()"
            />
            <v-text-field
              v-model="form.apiKey"
              :error-messages="apiKeyErrors"
              name="apiKey"
              label="API access key"
              :type="showApiKey ? 'text' : 'password'"
              :append-icon="showApiKey ? 'visibility_off' : 'visibility'"
              counter="40"
              :disabled="loading"
              @input="$v.form.apiKey.$touch()"
              @blur="$v.form.apiKey.$touch()"
              @click:append="showApiKey = !showApiKey"
            />
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
                :loading="loading"
                @click.native="validateForm()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import profileValidation from '@/mixins/validations/profile'

export default {
  mixins: [profileValidation],
  data: () => ({
    loading: false,
    showApiKey: false
  }),
  methods: {
    ...mapActions({
      save: 'profile/save',
      selectDefaultProfile: 'profile/select'
    }),
    validateForm() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.loading = true
        this.saveProfile()
      }
    },
    async saveProfile() {
      await this.save(this.form)
      await this.selectDefaultProfile(this.form)
      this.loading = false
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
