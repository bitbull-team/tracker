<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-stepper v-model="step" vertical class="elevation-0">
        <v-stepper-step :complete="step > 1" step="1">
          Create new profile
        </v-stepper-step>

        <v-stepper-items>
          <v-stepper-content step="1">
            <profile-details
              ref="form1"
              v-model="form"
              :loading="loading"
              @submit="validateForm1()"
            />
            <v-layout>
              <v-spacer />
              <v-btn
                v-if="canBeCanceled"
                color="warning"
                flat
                :loading="loading"
                @click="cancel()"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                flat
                :disabled="!isValid('form1')"
                :loading="loading"
                @click="validateForm1()"
              >
                Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Change profile settings
          </v-stepper-step>

          <v-stepper-content step="2">
            <profile-settings
              ref="form2"
              v-model="form"
              :loading="loading"
              @submit="validateForm2()"
            />

            <v-layout>
              <v-spacer />
              <v-btn
                color="primary"
                flat
                :disabled="!isValid('form2')"
                :loading="loading"
                @click="validateForm2()"
              >
                Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-step step="3">
            Provide issues preference
          </v-stepper-step>

          <v-stepper-content step="3">
            <issues-preference
              ref="form3"
              v-model="form"
              :loading="loading"
              @submit="validateForm3()"
            />

            <v-layout>
              <v-spacer />
              <v-btn
                color="primary"
                flat
                :disabled="!isValid('form2')"
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
import { mapActions, mapGetters } from 'vuex'
import profileValidation from '@/mixins/validations/profile'
import ProfileDetails from '@/components/profile/Details'
import ProfileSettings from '@/components/profile/Settings'
import IssuesPreference from '@/components/profile/IssuesPreference'

export default {
  components: {
    ProfileDetails,
    ProfileSettings,
    IssuesPreference
  },
  mixins: [profileValidation],
  data: () => ({
    loading: false,
    step: 1
  }),
  computed: {
    ...mapGetters({
      canBeCanceled: 'profile/isAtLeastOneConfigured'
    })
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

      if (this.$refs.form1.validate() === false) {
        return
      }

      await this.saveProfile()
      this.step = 2
    },
    async validateForm2() {
      this.$v.$touch()

      if (this.$refs.form2.validate() === false) {
        return
      }

      await this.saveProfile()
      this.step = 3
    },
    async validateForm3() {
      this.$v.$touch()

      if (this.$refs.form3.validate() === false) {
        return
      }

      await this.saveProfile()
      await this.selectDefaultProfile(this.form.id)
      this.$router.push({ name: 'dashboard' })
    },
    async saveProfile() {
      this.loading = true
      this.form.id = await this.save(this.form)
      this.loading = false
    },
    cancel() {
      this.$router.push({ name: 'dashboard' })
    },
    isValid(form) {
      return true
      // this bind not working, only executed once
      return this.$refs[form] !== undefined && this.$refs[form].isValid()
    }
  }
}
</script>
