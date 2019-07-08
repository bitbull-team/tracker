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
      <project-selector
        v-model="projectToFilter"
        :disabled="loading"
        @change="
          filters.project_id = projectToFilter ? projectToFilter.id : null
        "
      />
    </v-flex>
    <v-flex xs6>
      <v-switch v-model="assignedToMe" :label="$t('Assigned to me')" />
    </v-flex>
    <v-progress-linear v-if="loading" height="2" :indeterminate="true" />
    <v-flex>
      <issues :items="issues" :disable="loading" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Issues from '@/components/issues/List'
import ProjectSelector from '@/components/project/Selector.vue'

export default {
  components: {
    Issues,
    ProjectSelector
  },
  data: () => ({
    loading: false,
    projectToFilter: null,
    filters: {
      status_id: 'open',
      assigned_to_id: 'me',
      project_id: null
    },
    assignedToMe: true,
    issues: []
  }),
  computed: {
    ...mapGetters({
      sortBy: 'issue/sortBy'
    }),
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
      await this.loadIssues(this.filters)
      this.issues = this.sortBy('priority', true)
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
