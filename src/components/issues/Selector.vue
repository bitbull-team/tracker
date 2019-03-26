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
      item-text="subject"
      return-object
      hide-no-data
      no-filter
      hide-selected
      @change="$emit('change')"
    >
      <template slot="selection" slot-scope="{ item }">
        <span v-if="item !== null">{{ item.id }} - {{ item.subject }}</span>
      </template>
      <template slot="item" slot-scope="{ parent, item }">
        <template>
          <v-list-tile-content>
            <!-- eslint-disable-next-line vue/no-v-html,prettier/prettier -->
            <v-list-tile-title v-html="`${parent.genFilteredText(item.subject)}`" />
            <v-list-tile-sub-title
              v-if="item.project !== undefined"
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

export default {
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
    }
  },
  data: () => ({
    issues: [],
    loading: false,
    search: null,
    selected: null
  }),
  watch: {
    // TODO: improve with debounce
    async search() {
      if (this.loading || this.search === null) return
      this.loading = true
      this.issues = await this.loadIssues({
        f: ['subject'],
        'op[subject]': '~',
        'v[subject]': [this.search !== '' ? this.search : undefined]
      })
      this.loading = false
    },
    selected(value) {
      this.$emit('input', value)
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
      loadIssues: 'issue/loadWithFilter'
    })
  }
}
</script>
