import { mount } from '@vue/test-utils'
import Passage from '@/components/Passage.vue'
import Question from '@/components/Question'
import Text from '@/components/Text.vue'
import { nextTick } from '@vue/runtime-core'

const PassageComponent = {
  template: `
  <Passage>
    <Question>
      <slot name="question"></slot>
    </Question>
    <Text :every="every" :testContentInjector="testContentInjector">  
     <slot name="content"></slot>
    </Text> 
  </Passage>`,
  props: ['every', 'testContentInjector'],
  components: {
    Passage,
    Question,
    Text,
  },
}

const redefineProperty = ($el: any, propertyName: any, value: any) => {
  Object.defineProperty($el, propertyName, { writable: true })
  $el[propertyName] = value
}

const makeLineTestContentInjector = (contentText: any) => {
  return ($content: any) => {
    $content.style.setProperty('line-height', '20px')
    redefineProperty(
      $content,
      'offsetHeight',
      contentText.trim().split('\n').length * 20
    )
  }
}

const getMultipleLines = (contentText: any) => {
  return contentText.trim().split('\n').join('<br/>')
}

describe('Passage', () => {
  it('renders single line numbers', async () => {
    const questionText = `\
      Ref is on the line <a href="#passage-text-ref"></a>.
    `
    const contentText = `\
    <p>Line 1</p>
    <p>Line 2 <a id="text-ref"></a>
    Line 3</p>
    `
    const wrapper = await mount(PassageComponent, {
      props: {
        every: 1,
        testContentInjector: makeLineTestContentInjector(contentText),
      },
      slots: {
        content: getMultipleLines(contentText),
        question: questionText,
      },
    })
    await nextTick()
    const wapper_html = wrapper.html()
    console.log(wapper_html)
    // expect(wapper_html).toContain(`<div>1</div>`)
    // expect(wapper_html).toContain(`<div>2</div>`)
    // expect(wapper_html).toContain(`<div>3</div>`)
  })
})
