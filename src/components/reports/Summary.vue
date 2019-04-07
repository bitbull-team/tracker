<template>
  <div class="summary">
    <h4>{{ title }}</h4>

    <div class="hours" :class="{ 'hours--not-worked': totalHours === 0 }">
      <span>{{ totalHours }}</span> <span class="label">{{ $t('hours') }}</span>
    </div>

    <button v-if="totalHours > 0">
      {{ $t('View details') }}
    </button>
  </div>
</template>

<script>
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
  computed: {
    title() {
      let period = []
      if (this.type === 'day') {
        period = ['Today', 'today']
      } else if (this.type === 'week') {
        period = ['This week', 'this week']
      } else {
        period = ['This month', 'this month']
      }
      return this.entries.length === 0
        ? this.$t('You have not worked ' + period[1] + ', is it holiday?')
        : this.$t(period[0] + ' you worked for')
    },
    totalHours() {
      let tot = 0
      this.entries.forEach(element => {
        tot += element.hours
      })
      return Math.round(tot.toFixed(2))
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
  width: 310px;
  height: 310px;
  border: solid 10px var(--v-primary-base);
  border-radius: 50%;
  font-size: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 2rem;
  color: var(--v-primary-base);
  font-weight: 500;
  flex-wrap: wrap;
  flex-direction: column;
  span {
    display: block;
    line-height: 1;
  }
  .label {
    font-size: 0.4em;
  }
  &--not-worked {
    border-color: var(--v-error-base);
    color: var(--v-error-base);
  }
}
button {
  background-color: var(--v-secondary-base);
  color: white;
  margin: 1em auto;
  padding: 0.5em 2em;
  display: block;
  font-size: 1.3em;
}
</style>
