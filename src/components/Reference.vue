<template>
  <span>{{ getRefline }}</span>
</template>

<script lang="ts">
export default {
  props: { refId: String },
  inject: ['passage'],
  computed: {
    getRefline(): number {
      if (!this.passage) {
        throw new Error('Missing <Passage> container')
      }

      if (!this.refId) {
        throw new Error('Missing Reference Id')
      }
      const { references } = this.passage
      return references[this.refId] || `No page ref: ${this.refId}`
    },
  },
}
</script>
