<template>
  <v-dialog v-model="isOpen" max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" flat="flat" @click="cancel()">
          Cancel
        </v-btn>
        <v-btn flat="flat" color="primary" @click="confirm()">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    message: {
      type: String,
      default: () => ''
    },
    value: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    isOpen: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    confirm() {
      this.$emit('input', false)
      this.$emit('confirmed')
    },
    cancel() {
      this.$emit('input', false)
      this.$emit('canceled')
    }
  }
}
</script>

<style scoped></style>
