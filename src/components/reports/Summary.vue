<template>
  <div class="summary">
    <h4>{{ title }}</h4>

    <div class="hours" :class="{ 'hours--not-worked': totalHours === 0 }">
      <span>{{ totalHours }}</span> <span class="label">{{ $t('hours') }}</span>
    </div>

    <button>{{ $t('View details') }}</button>
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
      return Math.round(tot)
    }
  }
}
</script>

<style lang="scss">
$color: #5dedd5;
$color-danger: rgb(209, 0, 0);
$color-button: #46beaa;
h4 {
  color: $color;
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
  border: solid 10px $color;
  border-radius: 50%;
  font-size: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 2rem;
  color: $color;
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
    border-color: $color-danger;
    color: $color-danger;
  }
}
.hours-chart {
  margin: 1rem 0;
  .circle-background {
    stroke: lighten($color, 30%);
  }
  .circle-percentage {
    stroke: $color;
    animation: circle-chart-fill 2s reverse; /* 1 */
    transform: rotate(-90deg) scale(1, -1); /* 2, 3 */
    transform-origin: center; /* 4 */
  }
  .text {
    animation: circle-chart-appear 2s forwards;
    opacity: 0;
    transform: translateY(0.3em);
  }
  .count {
    font-size: 8em;
    font-weight: 500;
    fill: $color;
  }
  .label {
    font-size: 3em;
    font-weight: 500;
    fill: $color;
  }
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    border-bottom: dashed 1px #e5e5e5;
    margin-bottom: 1rem;
  }
  p {
    margin: 0;
  }
}
button {
  background-color: $color-button;
  color: white;
  margin: 1em auto;
  padding: 0.5em 2em;
  display: block;
  font-size: 1.3em;
}
</style>
