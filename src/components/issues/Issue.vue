<template>
  <v-card class="card">
    <v-layout row wrap>
      <span class="status">
        <span
          class="status__circle"
          :style="'background-color:' + statusColor[issue.status.id]"
        />
        <span class="status__title">{{ issue.status.name }}</span>
      </span>
      <v-flex xs2 />
      <v-flex xs11>
        <span class="assignee">
          {{ $t('Assigned to') }}
          {{
            issue.assigned_to.id === $store.state.api.currentUser.id
              ? 'me'
              : issue.assigned_to.name
          }}
        </span>
        <span class="issue">#{{ issue.id }} {{ issue.subject }}</span>
        <span class="project">{{ issue.project.name }}</span>
      </v-flex>
      <v-flex xs1>
        <v-list-tile-action>
          <v-icon @click="startNewTimer({ issueId: issue.id, comments: '' })">
            play_circle_outline
          </v-icon>
        </v-list-tile-action>
      </v-flex>

      <v-progress-linear
        v-if="issue.estimated_hours"
        v-model="progress"
        background-color="grey lighten-3"
        :color="status"
        height="6"
        class="progress"
      />
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import colors from 'vuetify/es5/util/colors'

export default {
  props: {
    issue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      statusColor: {
        1: colors.indigo.base,
        2: colors.pink.base,
        3: colors.green.base,
        4: colors.orange.base,
        5: colors.grey.darken3,
        6: colors.red.accent4,
        7: colors.grey.base,
        8: colors.yellow.lighten1,
        9: colors.lime.lighten2,
        10: colors.grey.lighten2
      }
    }
  },
  computed: {
    progressPercent() {
      let estimate = this.issue.estimated_hours || 0
      let spent = this.issue.spent_hours || 0
      return Math.round(spent * (100 / estimate))
    },
    progress() {
      if (this.progressPercent > 100) return this.progressPercent - 100
      return this.progressPercent
    },
    status() {
      if (this.progressPercent > 100) return 'warning'
      if (this.progressPercent > 150) return 'error'
      return 'success'
    }
  },
  methods: {
    ...mapActions({
      startTimer: 'timer/start',
      updateStatus: 'issue/updateStatusIssue'
    }),
    startNewTimer({ issueId, comments, activityId }) {
      if (
        this.issue.status.id === 1 &&
        this.issue.assigned_to.id === this.$store.state.api.currentUser.id
      ) {
        this.updateStatus({ issueId: issueId, status_id: 2 })
      }
      this.startTimer({ issueId: issueId, comments: comments })
      this.$router.push({ name: 'timers' })
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
}
.progress {
  margin-top: 1rem;
}
.status {
  &__circle {
    $dim: 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0; //0.6rem;
    text-align: center;
    display: inline-block;
    width: $dim;
    height: $dim;
    border-radius: 50%;
    background: black;
    color: white;
  }
  &__title {
    text-transform: uppercase;
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
}
.issue {
  display: block;
  font-weight: 500;
}
.project {
  color: var(--v-primary-base);
}
.assignee {
  color: grey;
  font-size: 0.7em;
  text-transform: uppercase;
}
</style>
