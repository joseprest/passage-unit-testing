<template>
  <span>{{ line }}</span>
</template>

<script>
export default {
  props: ['refId'],
  inject: ['passage'],
  computed: {
    line() {
      return this.passage?.references[this.$props.refId] ?? 0
    },
  },
}
</script>

<style lang="scss"></style>
