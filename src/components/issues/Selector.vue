<template>
  <div>
    <v-autocomplete
      v-model="selected"
      :items="issues"
      :loading="loading"
      :search-input.sync="search"
      :label="label"
      :placeholder="placeholder"
      :error-messages="errorMessages"
      :disabled="disabled"
      item-text="subject"
      return-object
      hide-no-data
      no-filter
      hide-selected
      :clearable="true"
    >
      <template slot="selection" slot-scope="{ item }">
        <span v-if="item !== null">
          {{ item.id }} - {{ item.subject | truncate(40) }}
        </span>
      </template>
      <template slot="item" slot-scope="{ parent, item }">
        <template>
          <v-list-tile-content>
            <!-- eslint-disable-next-line vue/no-v-html,prettier/prettier -->
            <v-list-tile-title v-if="item != null" v-html="`${parent.genFilteredText(item.subject)}`" />
            <v-list-tile-sub-title
              v-if="item != null && item.project !== undefined"
              v-text="item.project.name"
            />
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import debounce from 'debounce'

export default {
  filters: {
    truncate: (text, stop) => {
      if (text === undefined || text === null) {
        return
      }
      stop = stop || 20
      const clamp = '...'
      return text.slice(0, stop) + (stop < text.length ? clamp : '')
    }
  },
  props: {
    value: {
      type: Object,
      default: () => null
    },
    label: {
      type: String,
      default: () => 'Select an issue'
    },
    placeholder: {
      type: String,
      default: () => 'Start typing to Search'
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    issues: [],
    loading: false,
    search: null,
    selected: null
  }),
  watch: {
    search: debounce(async function() {
      if (this.loading || this.search === null) return
      this.loading = true
      if (isNaN(parseInt(this.search)) === false) {
        const issue = await this.loadIssueByNumber(this.search)
        if (issue !== null) {
          this.issues = [issue]
        }
      } else {
        this.issues = await this.loadIssues({
          f: ['subject'],
          'op[subject]': '~',
          'v[subject]': [this.search !== '' ? this.search : undefined]
        })
      }
      this.loading = false
    }, 800),
    selected(value) {
      if (value === null) {
        this.issues = []
      }
      this.$emit('input', value)
      this.$emit('change')
    },
    value(value) {
      this.selected = value
      this.issues.push(value)
    }
  },
  mounted() {
    if (this.value !== null) {
      this.selected = this.value
      this.issues.push(this.value)
    }
  },
  methods: {
    ...mapActions({
      loadIssues: 'issue/loadWithFilter',
      loadIssueByNumber: 'issue/loadSingle'
    })
  }
}
</script>
