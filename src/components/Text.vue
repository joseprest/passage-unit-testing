<script>
import getLineHeight from 'line-height'
import { ResizeObserver } from '@juggle/resize-observer'
import { getIndexedArray } from '../services/utils'
export default {
  data() {
    return {
      isMounted: false,
      contentHeight: 0,
      lineHeight: 0,
    }
  },
  inject: ['passage'],
  props: ['every', 'testContentInjector'],
  computed: {
    lineNums() {
      // line calc requires mounted DOM
      const content = this.$refs.content
      console.log('[lineNums content]', content)
      if (!this.isMounted || !content || !this.lineHeight) {
        return []
      }

      const lineCount = this.contentHeight / this.lineHeight
      const lines = getIndexedArray(lineCount)
      const lineInterval = this.every ?? 1

      switch (lineInterval) {
        case 'p':
          const pLineNums =
            // find all paragraphs
            Array.from(content.getElementsByTagName('p'))
              // get distance from top of content
              .map((p) => p.offsetTop - content.offsetTop)
              // calculate how many lineNums down it is
              .map((p) => p / this.lineHeight)

          return lines.map((line) => {
            const idx = pLineNums.findIndex((pIdx) => pIdx == line)
            return idx < 0 ? '' : idx + 1
          })
        default:
          // array of empty (undefined) line labels, length of total displayed line count
          return lines.map((i) => ((i + 1) % lineInterval ? '' : i + 1))
      }
    },
  },
  mounted() {
    this.isMounted = true
    const content = this.$refs.content

    // hook for testing different content
    if (this.testContentInjector) {
      this.testContentInjector.call(this, content)
    }

    const updateLineRefs = () => {
      if (this.passage) {
        const { references } = this.passage
        if (references) {
          content.querySelectorAll('a[id]').forEach((ref) => {
            const line =
              this.every !== 'p'
                ? (ref.offsetTop - content.offsetTop) / this.lineHeight
                : Array.from(content.children).indexOf(ref.parentNode)

            const id = ref.getAttribute('id')
            references[id] = Math.round(line + 1)
          })
        }
      }
    }

    const updateView = () => {
      const newLineHeight = getLineHeight(content)
      const newContentHeight = content.offsetHeight

      // check that no need to update
      if (
        !newLineHeight ||
        !newContentHeight ||
        (newLineHeight === this.lineHeight &&
          newContentHeight === this.contentHeight)
      )
        return

      this.lineHeight = newLineHeight
      this.contentHeight = newContentHeight
      updateLineRefs()
    }

    const requestUpdate = animationCallback(updateView)
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

/**
 * debounce multiple animationFrame requests,
 * tracking animationId state in the closure
 */
const animationCallback = (callback) => {
  let animationId
  return () => {
    if (animationId) window.cancelAnimationFrame(animationId)
    animationId = window.requestAnimationFrame(callback)
  }
}
</script>

<template>
  <div class="reading-passage">
    <div class="line-numbers">
      <div v-for="(line, index) in lineNums" v-bind:key="index">{{ line }}</div>
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
  height: 100%;
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
