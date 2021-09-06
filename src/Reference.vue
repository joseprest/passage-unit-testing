<template>
  <span>{{ line }}</span>
</template>

<script>
export default {
  props: ['snippet-id'],
  inject: ['readingPassage'],
  computed: {
    line: () => this.readingPassage.references[this.$props.snippetId],
  },
}
</script>

<style lang="scss"></style>
