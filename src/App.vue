<template>
  <v-app>
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
</style>
