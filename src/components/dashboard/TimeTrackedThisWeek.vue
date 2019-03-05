<template>
  <div>
    <h4>{{ $t('This week you worked for') }}</h4>

    <div class="week-hours">
      <span>{{ totalHours }}</span> <span class="label">{{ $t('hours') }}</span>
    </div>

    <v-list three-line>
      <v-list-tile v-for="task in taskList" :key="task.id">
        <v-list-tile-content>
          <v-list-tile-title>
            <strong class="issue"
              >#{{ task.issue ? task.issue.id : 'no task' }}</strong
            >:
            <span class="comment">{{ task.comments }}</span>
          </v-list-tile-title>
          <v-list-tile-sub-title
            >{{ $t('Hours') }}: {{ task.hours }}</v-list-tile-sub-title
          >
          <v-list-tile-sub-title
            >{{ $t('Project') }}: {{ task.project.name }}</v-list-tile-sub-title
          >
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    circle: 310
  }),
  async mounted() {
    this.loading = true
    await this.loadTimeEntries()
    this.loading = false
  },
  methods: {
    ...mapActions({
      loadTimeEntries: 'timeEntry/loadThisWeek'
    })
  },
  computed: {
    taskList() {
      return this.$store.state.timeEntry.thisWeekItems
    },
    totalHours() {
      let tot = 0
      this.taskList.forEach(element => {
        tot += element.hours
      })
      return Math.round(tot)
    },
    donePercentage() {
      let totWeekHour = 40
      return (this.totalHours * 100) / totWeekHour + ',100'
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #5dedd5;
h4 {
  color: $color;
  font-weight: normal;
  text-align: center;
  font-size: 1.5em;
}
.week-hours {
  width: 310px;
  height: 310px;
  border: solid 10px $color;
  border-radius: 50%;
  font-size: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 2rem;
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
</style>
