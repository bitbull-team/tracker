<template>
  <v-navigation-drawer
    :mini-variant="miniVariant"
    :mini-variant-width="90"
    :clipped="clipped"
    v-model="isOpen"
    fixed
    app
  >
    <v-list> </v-list>
    <v-icon
      class="side-btn"
      @click.stop="miniVariant = !miniVariant"
      v-html="miniVariant ? 'chevron_right' : 'chevron_left'"
    />
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    clipped: false,
    fixed: true,
    miniVariant: false
  }),
  computed: {
    isOpen: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>
.route-selected {
  background: rgba(0, 0, 0, 0.04);
}
.side-btn {
  cursor: pointer;
  position: absolute !important;
  right: 0;
  top: 50%;
}
</style>
