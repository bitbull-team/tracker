<template>
  <v-list three-line>
    <v-list-tile v-for="issue in items" :key="issue.id">
      <v-list-tile-content>
        <v-list-tile-title>{{ issue.subject }}</v-list-tile-title>
        <v-list-tile-sub-title>
          Status: {{ issue.status.name }}
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          Project: {{ issue.project.name }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>play_circle_outline</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
