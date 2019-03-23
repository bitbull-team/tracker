<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-stepper v-model="step" vertical class="elevation-0">
        <v-stepper-step :complete="step > 1" step="1">
          Create
        </v-stepper-step>

        <v-stepper-items>
          <v-stepper-content step="1">
            <form novalidate @submit.prevent="validateForm1">
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
            </form>
            <v-layout>
              <v-spacer />
              <v-btn
                color="primary"
                flat
                :disabled="!form1Valid"
                :loading="loading"
                @click="validateForm1()"
              >
                Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Settings
          </v-stepper-step>

          <v-stepper-content step="2">
            <form novalidate @submit.prevent="validateForm2">
              <v-switch v-model="form.darkMode" :label="`Dark theme`" />
              <v-select
                v-model="form.language"
                :items="languages"
                label="Language"
              />
            </form>

            <v-layout>
              <v-spacer />
              <v-btn
                color="primary"
                flat
                :disabled="!form2Valid"
                :loading="loading"
                @click="validateForm2()"
              >
                Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step step="3">
            Issue preference
          </v-stepper-step>

          <v-stepper-content step="3">
            <form novalidate @submit.prevent="validateForm3" />

            <v-layout>
              <v-spacer />
              <v-btn
                color="primary"
                flat
                :disabled="!form3Valid"
                :loading="loading"
                @click="validateForm3()"
              >
                Complete
              </v-btn>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import profileValidation from '@/mixins/validations/profile'
import availableLanguages from '@/mixins/availableLanguages'

export default {
  mixins: [profileValidation, availableLanguages],
  data: () => ({
    loading: false,
    step: 1,
    showApiKey: false
  }),
  computed: {
    form1Valid() {
      return (
        this.nameErrors.length === 0 ||
        this.urlErrors.length === 0 ||
        this.apiKeyErrors.length === 0
      )
    },
    form2Valid() {
      return (
        this.nameErrors.length === 0 ||
        this.urlErrors.length === 0 ||
        this.apiKeyErrors.length === 0
      )
    },
    form3Valid() {
      return (
        this.nameErrors.length === 0 ||
        this.urlErrors.length === 0 ||
        this.apiKeyErrors.length === 0
      )
    }
  },
  watch: {
    'form.language': function(value) {
      this.$i18n.locale = value
    },
    'form.darkMode': function(value) {
      this.saveProfile()
    }
  },
  mounted() {
    this.form.language = this.$i18n.locale
  },
  methods: {
    ...mapActions({
      save: 'profile/save',
      selectDefaultProfile: 'profile/select'
    }),
    async validateForm1() {
      this.$v.$touch()

      if (this.form1Valid === false) {
        return
      }

      await this.saveProfile()
      await this.selectDefaultProfile(this.form.id)
      this.step = 2
    },
    async validateForm2() {
      this.$v.$touch()

      if (this.form2Valid === false) {
        return
      }
      await this.saveProfile()
      this.step = 3
    },
    async validateForm3() {
      this.$v.$touch()

      if (this.form3Valid === false) {
        return
      }

      await this.saveProfile()
      this.$router.push({ name: 'dashboard' })
    },
    async saveProfile() {
      this.loading = true
      this.form.id = await this.save(this.form)
      this.loading = false
    }
  }
}
</script>
