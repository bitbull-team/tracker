<template>
  <v-app :dark="$store.state.profile.current.darkMode">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  overflow: auto;
}
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: #fafafa;
}

*::-webkit-scrollbar-thumb {
  background: #9e9e9e;
}
.theme--light.application {
  background-color: white;
}
.v-dialog--fullscreen .v-card {
  height: 100vh;
}
</style>
