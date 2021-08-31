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
import getLineHeight from "line-height";

export default {
  props: ["every"],
  data() {
    return {
      showLineNumbers: true,
      isMounted: false,
      contentHeight: 0,
    };
  },
  methods: {
    lines() {
      // line calc requires mounted DOM
      const $content = this.$refs.content;
      if (!this.isMounted || !$content) return;

      const every = this.every ?? 1;
      const byLine = every !== "p";
      const lineHeight = getLineHeight($content);
      const lineCount = this.contentHeight / lineHeight;
      // array of empty (undefined) line labels, length of total displayed line count
      const lines = Array.from({ length: lineCount });

      const linesEvery = (every) =>
        Array.from({ length: lineCount }, (_, i) => i + 1).filter(
          (i) => !(i % every)
        );
      const markOffset = (offset, value) => (lines[offset - 1] = value);

      const paragraphLineNumbers = () =>
        // find all paragraphs
        Array.from($content.getElementsByTagName("p"))
          // get distance from top of content
          .map(($p) => $p.offsetTop - $content.offsetTop)
          // calculate how many lines down it is
          .map((p) => p / lineHeight + 1);

      if (byLine) {
        linesEvery(every).forEach((offset) => markOffset(offset, offset));
      } else {
        paragraphLineNumbers().forEach((offset, index) =>
          markOffset(offset, index + 1)
        );
      }

      return lines;
    },
  },
  mounted() {
    const $content = this.$refs.content;
    this.contentHeight = $content.offsetHeight;
    this.isMounted = true;

    const updateDimensions = debounceWithLeading(
      () => {
        this.showLineNumbers = false;
      },
      () => {
        this.contentHeight = $content.offsetHeight;
        this.showLineNumbers = true;
        window.requestAnimationFrame(() => this.$forceUpdate());
      },
      50
    );

    const observeContentHeight = () => {
      const observeContentHeight = (entries) => {
        for (let entry of entries) {
          let newWidth = this.contentHeight;
          if (entry.contentRect) {
            newWidth = entry.contentRect.width;
          } else {
            newWidth = entry.contentBoxSize[0].blockSize;
          }
          if (newWidth !== this.contentHeight) updateDimensions();
        }
      };
      const resizeObserver = new ResizeObserver(observeContentHeight);
      resizeObserver.observe(this.$refs.content);
      return () => {
        resizeObserver.disconnect();
      };
    };

    return observeContentHeight();
  },
};

function debounceWithLeading(leadingFunc, debounceFunc, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    leadingFunc.apply(this, args);
    timer = setTimeout(() => {
      debounceFunc.apply(this, args);
    }, timeout);
  };
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
