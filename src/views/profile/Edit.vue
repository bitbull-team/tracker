<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-0">
        <v-card-title primary-title>
          <div>
            <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
            <h3 class="headline mb-0">Edit profile {{ form.name }}</h3>
          </div>
        </v-card-title>

        <v-card-text>
          <profile-details
            ref="form1"
            v-model="form"
            :loading="loading"
            @submit="validateForm()"
          />
          <profile-settings
            ref="form2"
            v-model="form"
            :loading="loading"
            @submit="validateForm()"
          />
          <issues-preference
            ref="form3"
            v-model="form"
            :loading="loading"
            @submit="validateForm()"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="warning" flat :loading="loading" @click="cancel()">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            flat
            :disabled="$v.form.$invalid"
            :loading="loading"
            @click="validateForm()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
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
    loading: false
  }),
  computed: {
    ...mapGetters({
      getProfileById: 'profile/getProfileById'
    })
  },
  mounted() {
    this.form = Object.assign(
      this.form,
      this.getProfileById(this.$route.params.id)
    )
    if (this.$refs.form1) this.$refs.form1.validate()
    if (this.$refs.form2) this.$refs.form2.validate()
    if (this.$refs.form3) this.$refs.form3.validate()
  },
  methods: {
    ...mapActions({
      save: 'profile/save'
    }),
    async validateForm() {
      this.$v.$touch()
      if (this.$refs.form1) this.$refs.form1.validate()
      if (this.$refs.form2) this.$refs.form2.validate()
      if (this.$refs.form3) this.$refs.form3.validate()

      if (this.$v.form.$invalid) {
        return
      }

      await this.saveProfile()
    },
    async saveProfile() {
      this.loading = true
      await this.save(this.form)
      this.loading = false
      this.$router.push({ name: 'dashboard' })
    },
    cancel() {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
