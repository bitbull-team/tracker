<template>
  <v-layout row wrap>
    <h4>{{ $t('Logged time of the') }} {{ rangeTime }}</h4>

    <ul v-if="entries.length > 0" class="list">
      <li v-for="entry in entries" :key="entry.id">
        <div class="details">
          <span class="issue">
            <a
              href="https://tracker.bitbull.it/issues/"
              target="_blank"
              class="task"
            >
              {{ entry.issue.id }}
            </a>
            {{ entry.project.name }}
          </span>
          <span class="comments">{{ entry.comments }}</span>
          <span class="date">{{ entry.spent_on }}</span>
        </div>
        <div class="time">
          {{ entry.hours }}
        </div>
      </li>
    </ul>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    dailyEntries() {
      return this.$store.state.timeEntry.todayItems
    },
    weeklyEntries() {
      return this.$store.state.timeEntry.thisWeekItems
    },
    monthlyEntries() {
      return this.$store.state.timeEntry.thisMonthItems
    },
    rangeTime() {
      return this.$route.params.range
    },
    entries() {
      if (this.rangeTime === 'week') return this.weeklyEntries
      if (this.rangeTime === 'month') return this.monthlyEntries
      return this.dailyEntries
    }
  }
}
</script>

<style lang="scss">
.list {
  margin: 0;
  padding: 0;
  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    margin-bottom: 1rem;
    border-bottom: solid 1px var(--v-line-lighten);
    padding: 0.5rem;
    span {
      display: block;
    }
    .task {
      font-weight: bold;
    }
    .date {
      color: var(--v-line-base);
    }
    .details {
      flex: 0 0 70%;
    }
    .time {
      flex: 0 0 30%;
      text-align: right;
    }
  }
}
</style>
