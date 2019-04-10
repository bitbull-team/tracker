<template>
  <div>
    <v-autocomplete
      v-model="selected"
      :items="projects"
      :label="label"
      :placeholder="placeholder"
      :error-messages="errorMessages"
      :disabled="disabled"
      item-text="name"
      return-object
      hide-no-data
      hide-selected
      :clearable="true"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'debounce'

export default {
  props: {
    value: {
      type: Object,
      default: () => null
    },
    label: {
      type: String,
      default: () => 'Select a project'
    },
    placeholder: {
      type: String,
      default: () => 'Start typing to Search'
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    selected: null
  }),
  computed: {
    ...mapState({
      projects: state => state.project.items
    })
  },
  watch: {
    selected(value) {
      this.$emit('input', value)
      this.$emit('change')
    }
  },
  mounted() {
    if (this.value !== null) {
      this.selected = this.value
      this.projects.push(this.value)
    }
  }
}
</script>
