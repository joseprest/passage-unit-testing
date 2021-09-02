<script>
import getLineHeight from 'line-height'
import { ResizeObserver } from '@juggle/resize-observer'

export default {
  data() {
    return {
      isMounted: false,
      contentHeight: 0,
      lineHeight: 0,
    }
  },
  inject: ['readingPassage'],
  props: ['every', 'testContentInjector'],
  methods: {
    lines() {
      // line calc requires mounted DOM
      const $content = this.$refs.content
      if (!this.isMounted || !$content) {
        return
      }

      const every = this.every ?? 1
      const byLine = every !== 'p'
      const lineCount = this.contentHeight / this.lineHeight
      // array of empty (undefined) line labels, length of total displayed line count
      const lines = Array.from({ length: lineCount })

      const linesEvery = (every) =>
        Array.from({ length: lineCount }, (_, i) => i + 1).filter(
          (i) => !(i % every)
        )
      const markOffset = (offset, value) => (lines[offset - 1] = String(value))

      const paragraphLineNumbers = () =>
        // find all paragraphs
        Array.from($content.getElementsByTagName('p'))
          // get distance from top of content
          .map(($p) => $p.offsetTop - $content.offsetTop)

          // calculate how many lines down it is
          .map((p) => p / this.lineHeight + 1)

      if (byLine) {
        linesEvery(every).forEach((offset) => markOffset(offset, offset))
      } else {
        paragraphLineNumbers().forEach((offset, index) =>
          markOffset(offset, index + 1)
        )
      }
      return lines
    },
  },
  mounted() {
    this.isMounted = true
    const $content = this.$refs.content

    // hook for testing different content
    if (this.testContentInjector) {
      this.testContentInjector.call(this, $content)
    }

    // TODO: move responsibility to update line refs out of here
    // const updateLineRefs = () => {
    //   const $refs = $content.querySelectorAll('a[id]')
    //   this.readingPassage.reset()
    //   $refs.forEach(($ref) => {
    //     const refOffset = $ref.offsetTop
    //     const contentOffset = $content.offsetTop
    //     const line = (refOffset - contentOffset) / this.lineHeight + 1
    //     this.readingPassage.update($ref.getAttribute('id'), Math.round(line))
    //   })
    // }

    const updateView = () => {
      this.lineHeight = getLineHeight($content)
      this.contentHeight = $content.offsetHeight
    }

    let animationId
    const requestUpdate = () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId)
      }
      animationId = window.requestAnimationFrame(updateView)
    }

    const observeContentHeight = () => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentBoxSize[0].blockSize
          if (newWidth !== this.contentHeight) {
            requestUpdate()
          }
        }
      })
      resizeObserver.observe(this.$refs.content)

      return () => {
        resizeObserver.disconnect()
      }
    }

    updateView()
    return observeContentHeight()
  },
}
</script>

<template>
  <div class="reading-passage">
    <div class="line-numbers">
      <div v-for="line in lines()" v-bind:key="line">{{ line }}</div>
    </div>
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.reading-passage {
  display: flex;
}

.line-numbers {
  flex: 0 0;
  height: 100%;

  color: grey;
  font-size: 16px;
  font-style: italic;
  line-height: 20px;
  text-align: right;
  user-select: none;
}

.line-numbers div {
  min-height: 20px;
}

.content {
  margin: 0;
  padding-left: 1em;

  font-size: 20px;
  line-height: 20px;
}

.content p {
  text-indent: 1em;
  margin: 0;
}
</style>
