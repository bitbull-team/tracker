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
    <Sorter
      :default-sort="defaultSort"
      :custom-limit="100"
      :default-limit="defaultLimit"
      @change-sort="setSort"
      @change-limit="setLimit"
      @change-order="setDirection"
    />
    <v-progress-linear v-if="loading" height="2" :indeterminate="true" />
    <v-flex>
      <issues
        :items="issuesSortBy(defaultSort, isDescendant).slice(0, defaultLimit)"
        :disable="loading"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Issues from '@/components/issues/List'
import ProjectSelector from '@/components/project/Selector.vue'
import Sorter from '@/components/Sorter'

export default {
  components: {
    Issues,
    ProjectSelector,
    Sorter
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
    issues: [],
    defaultSort: 'priority',
    isDescendant: true,
    defaultLimit: 100
  }),
  computed: {
    ...mapGetters({
      issuesSortBy: 'issue/sortBy'
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
      this.issues = await this.loadIssues(this.filters)
      this.loading = false
    },
    setSort(order) {
      this.defaultSort = order
    },
    setLimit(num) {
      this.defaultLimit = num
    },
    setDirection() {
      this.isDescendant = !this.isDescendant
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
