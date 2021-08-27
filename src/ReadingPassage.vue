<template>
  <div class="reading-passage">
    <div class="line-numbers" v-if="showLineNumbers">
      <div v-for="line in lines()" v-bind:key="line">
        {{ line }}
      </div>
    </div>
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import getLineHeight from 'line-height'

export default {
  props: ['every'],
  data() {
    return {
      showLineNumbers: true,
      isMounted: false,
      screenWidth: window.screen.width,
    }
  },
  methods: {
    lines() {
      const $content = this.$refs.content
      if (!this.isMounted || !$content || !this.screenWidth) return
      const lineHeight = getLineHeight($content)
      const divHeight = $content.offsetHeight
      const lineCount = divHeight / lineHeight
      const byLine = this.every !== 'p'
      const every = this.every ?? 1
      const lines = Array.from({ length: lineCount })
      if (byLine) {
        const lineOffsets = Array.from(
          { length: lineCount },
          (_, i) => i + 1
        ).filter((i) => !(i % every))
        lineOffsets.forEach((offset) => (lines[offset - 1] = offset))
      } else {
        // by paragraph
        // find all paragraphs
        const lineOffsets = Array.from($content.getElementsByTagName('p'))
          // offset from top of content
          .map((el) => el.offsetTop - el.parentElement.offsetTop)
          // calculate how many lines down it is
          .map((p) => p / lineHeight + 1)
        lineOffsets.forEach((offset, index) => (lines[offset - 1] = index + 1))
      }
      return lines
    },
  },
  mounted() {
    this.isMounted = true
    let updateDimensions = () => {
      this.showLineNumbers = true
      this.$forceUpdate()
    }
    const hideNumbers = () => {
      this.showLineNumbers = false
    }
    updateDimensions = debounceWithLeading(updateDimensions, hideNumbers, 300)
    this.resizeObserver = new ResizeObserver(() => updateDimensions())
    this.resizeObserver.observe(this.$refs.content)
    return () => {
      this.resizeObserver.disconnect()
    }
  },
}

function debounceWithLeading(debounceFunc, leadingFunc, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    leadingFunc.apply(this, args)
    timer = setTimeout(() => {
      debounceFunc.apply(this, args)
    }, timeout)
  }
}
</script>

<style lang="scss">
.content {
  max-width: 600px;
  padding: 0 8em;
  font-size: 20px;
  line-height: 20px;
  margin: 0;

  p {
    text-indent: 1em;
    margin: 0;
  }
}

.line-numbers {
  user-select: none;
  position: absolute;
  left: 100px;
  height: 100%;
  font-style: italic;
  color: grey;
  text-align: right;
  font-size: 16px;
  line-height: 20px;
  div {
    min-height: 20px;
  }
}
</style>
