<template>
  <div class="summary">
    <h4>{{ title }}</h4>

    <v-progress-circular
      :rotate="-90"
      :value="progress"
      :size="300"
      :width="10"
      :color="progressColor"
      class="hours"
      :class="{ overworked: progress > 100 }"
    >
      <span class="total">{{ totalHours }}</span>
      <span class="label">{{ $t('hours') }}</span>
    </v-progress-circular>

    <router-link
      v-if="totalHours > 0"
      :to="{ name: 'logged-time', params: { range: type } }"
      class="button"
    >
      {{ $t('View details') }}
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import colors from 'vuetify/es5/util/colors'

export default {
  props: {
    entries: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'month'
    }
  },
  data() {
    return {
      totals: {
        day: this.$store.state.profile.current.dayHour || 8,
        week:
          (this.$store.state.profile.current.workingDays || 5) *
          (this.$store.state.profile.current.dayHour || 8),
        month:
          (this.$store.state.profile.current.workingDays || 5) *
          (this.$store.state.profile.current.dayHour || 8) *
          4
      }
    }
  },
  computed: {
    ...mapGetters({
      runningTimer: 'timer/getRunning'
    }),
    title() {
      let period = []
      if (this.type === 'day') {
        period = ['Today', 'today']
      } else if (this.type === 'week') {
        period = ['This week', 'this week']
      } else {
        period = ['This month', 'this month']
      }
      return !this.runningTimer && this.entries.length === 0
        ? this.$t('You have not worked ' + period[1] + ', is it holiday?')
        : this.$t(period[0] + ' you worked for')
    },
    totalHours() {
      return Math.round(
        this.entries.reduce(
          (tot, trakedTime) => tot + parseFloat(trakedTime.hours),
          0
        )
      )
    },
    progress() {
      return this.totalHours * (100 / this.totals[this.type])
    },
    progressColor() {
      if (this.progress === 0) return colors.grey.lighten2
      if (this.progress > 100) return colors.indigo.base
      return colors.blue.base
    }
  }
}
</script>

<style lang="scss">
h4 {
  color: var(--v-primary-base);
  font-weight: normal;
  text-align: center;
  font-size: 1.5em;
}
.summary {
  text-align: center;
}
.hours {
  font-size: 8em;
  font-weight: 500;
  line-height: 1;
  margin: 1rem auto 2rem;
}
span.total {
  display: block;
}
span.label {
  display: block;
  font-size: 0.4em;
}
.overworked {
  .v-progress-circular__overlay {
    fill: var(--v-secondary-base);
  }
  .v-progress-circular__info {
    color: white;
  }
}
.button {
  background-color: var(--v-secondary-base);
  color: white;
  margin: 1em auto;
  padding: 0.5em 2em;
  display: block;
  font-size: 1.3em;
  text-decoration: none;
}
</style>
