<template>
  <v-layout row wrap>
    <v-flex xs6>
      <v-select
        v-model="filters.status_id"
        :items="statuses"
        :label="$t('Status')"
        item-text="name"
        item-value="id"
        :disable="loading"
      />
    </v-flex>
    <v-flex xs6>
      <v-select
        v-model="filters.project_id"
        :items="projects"
        :label="$t('Project')"
        item-text="name"
        item-value="id"
        :disable="loading"
      />
    </v-flex>
    <v-flex xs6>
      <v-switch v-model="assignedToMe" :label="$t('Assigned to me')" />
    </v-flex>
    <v-progress-linear v-if="loading" height="2" :indeterminate="true" />
    <v-flex xs12>
      <issues :items="issues" :disable="loading" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Issues from '@/components/issues/List'

export default {
  components: {
    Issues
  },
  data: () => ({
    loading: false,
    filters: {
      status_id: 'open',
      assigned_to_id: 'me',
      project_id: null
    },
    assignedToMe: true,
    issues: []
  }),
  computed: {
    ...mapState({
      statuses: state =>
        [{ name: 'All open', id: 'open' }].concat(state.issueStatus.items),
      projects: state => [{ name: 'All', id: null }].concat(state.project.items)
    })
  },
  watch: {
    filters: {
      handler() {
        this.loadIssuesWithFilters()
      },
      deep: true
    },
    assignedToMe(value) {
      this.filters.assigned_to_id = value ? 'me' : undefined
    }
  },
  mounted() {
    this.loadIssuesWithFilters()
  },
  methods: {
    ...mapActions({
      loadIssues: 'issue/loadWithFilter'
    }),
    async loadIssuesWithFilters() {
      this.loading = true
      this.issues = await this.loadIssues(this.filters)
      this.loading = false
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
.v-list {
  background-color: transparent;
}
</style>
