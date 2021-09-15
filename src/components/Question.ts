import { h, VNode } from 'vue'
import Reference from './Reference.vue'

const PASSAGE_REF_MARK = '#passage-'

const isPassageRefAsAnchorNode = (node: VNode, keyword: string) =>
  node.type === 'a' && node?.props?.href?.startsWith(keyword)

const replacePassageRefAsAnchorNode = (nodes: VNode[]) => {
  return nodes.map((node) => {
    if (isPassageRefAsAnchorNode(node, PASSAGE_REF_MARK)) {
      const refId = node?.props?.href.substr(PASSAGE_REF_MARK.length)
      if (refId) {
        return h(Reference, { refId })
      }
    }
    return node
  })
}

export default {
  setup(props: any, { slots }: any) {
    return () => {
      const nodes: VNode[] = Array.from(slots.default())
      const resultNodes = replacePassageRefAsAnchorNode(nodes)
      return h('div', {}, resultNodes)
    }
  },
}
