<template>
  <span>{{ line }}</span>
</template>

<script>
export default {
  props: ['snippet-id'],
  inject: ['readingPassage'],
  computed: {
    line() {
      const line = this.readingPassage.state[this.$props.snippetId]
      return line
    },
  },
}
</script>

<style lang="scss"></style>
