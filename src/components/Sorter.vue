<template>
  <v-layout row wrap>
    <v-flex xs5>
      <v-select
        v-model="currentLimit"
        :items="totalTasksLimits"
        :label="$t('Show last')"
        @change="setLimit"
      />
    </v-flex>
    <v-flex xs6>
      <v-select
        v-model="currentSort"
        :items="totalSortingOptions"
        :label="$t('Ordered by')"
        @change="setSorting"
      />
    </v-flex>
    <v-flex xs1 class="text-xs-right">
      <v-icon class="pt-4" @click="setOrder">
        {{ descendant ? 'arrow_downward' : 'arrow_upward' }}
      </v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Sorter',
  props: {
    defaultSort: {
      type: String,
      default: 'priority'
    },
    defaultLimit: {
      type: Number,
      default: 5
    },
    defaulDescendant: {
      type: Boolean,
      default: true
    },
    customSorting: {
      type: [Object, Array],
      default: () => []
    },
    customLimit: {
      type: [Number, Array],
      default: () => []
    }
  },
  data: function() {
    return {
      sortingOptions: [
        { text: this.$t('Creation date'), value: 'start_date' },
        { text: this.$t('Priority'), value: 'priority' }
      ],
      tasksLimits: [3, 5, 10],
      totalSortingOptions: [],
      totalTasksLimits: [],
      currentSort: '',
      currentLimit: '',
      descendant: true
    }
  },
  mounted() {
    this.currentSort = this.defaultSort
    this.currentLimit = this.defaultLimit
    this.descendant = this.defaulDescendant
    // merge default sort option with custom from props
    this.totalSortingOptions = this.sortingOptions
    if (Array.isArray(this.customSorting)) {
      this.totalSortingOptions = this.totalSortingOptions.concat(
        this.customSorting
      )
    } else {
      let mergedSortingOptions = []
      mergedSortingOptions.push(this.customSorting)
      this.totalSortingOptions = this.totalSortingOptions.concat(
        mergedSortingOptions
      )
    }
    // merge default limit option with custom from props
    this.totalTasksLimits = this.tasksLimits
    if (Array.isArray(this.customLimit)) {
      this.totalTasksLimits = this.totalTasksLimits.concat(this.customLimit)
    } else {
      let mergedTasksLimits = []
      mergedTasksLimits.push(this.customLimit)
      this.totalTasksLimits = this.totalTasksLimits
        .concat(mergedTasksLimits)
        .sort((a, b) => a > b)
    }
  },
  methods: {
    setSorting(val) {
      this.$emit('change-sort', val)
    },
    setLimit(val) {
      this.$emit('change-limit', val)
    },
    setOrder(val) {
      this.descendant = !this.descendant
      this.$emit('change-order', val)
    }
  }
}
</script>

<style></style>
