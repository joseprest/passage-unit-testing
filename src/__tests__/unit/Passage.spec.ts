import { mount } from '@vue/test-utils'
import Passage from '@/components/Passage.vue'
import Text from '@/components/Text.vue'
import { nextTick } from '@vue/runtime-core'

const PassageComponent = {
  template: `
  <Passage>    
    <Text :every="every" :testContentInjector="testContentInjector">  
     <slot></slot>
    </Text> 
  </Passage>`,
  props: ['every', 'testContentInjector'],
  components: {
    Passage,
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

const makeParagraphTestContentInjector = (contentText: any) => {
  return ($content: any) => {
    $content.style.setProperty('line-height', '20px')
    // default paragraph offsets
    const $ps = $content.getElementsByTagName('p')
    let offsetTop = 0
    Array.from($ps).forEach(($p, index) => {
      redefineProperty($p, 'offsetTop', offsetTop)
      if (index == 0) {
        offsetTop += 40
      } else {
        offsetTop += 20
      }
    })
    redefineProperty(
      $content,
      'offsetHeight',
      contentText.trim().split('\n').length * 20 + 20
    )
  }
}
const getMultipleLines = (contentText: any) => {
  return contentText.trim().split('\n').join('<br/>')
}

describe('Passage', () => {
  it('renders single line numbers', async () => {
    const contentText = `\
    <p>Line 1</p>
    <p>Line 2
    Line 3</p>
    `
    const wrapper = await mount(PassageComponent, {
      props: {
        every: 1,
        testContentInjector: makeLineTestContentInjector(contentText),
      },
      slots: {
        default: getMultipleLines(contentText),
      },
    })
    await nextTick()
    // console.log(wrapper.html())
    const wapper_html = wrapper.html()
    expect(wapper_html).toContain(`<div>1</div>`)
    expect(wapper_html).toContain(`<div>2</div>`)
    expect(wapper_html).toContain(`<div>3</div>`)
  })

  it('renders every 5 line numbers', async () => {
    const contentText = `\
    <p>Line 1</p>
    <p>Line 2
    Line 3
    Line 4
    Line 5
    Line 6
    Line 7</p>
    `
    const wrapper = await mount(PassageComponent, {
      props: {
        every: 5,
        testContentInjector: makeLineTestContentInjector(contentText),
      },
      slots: {
        default: getMultipleLines(contentText),
      },
    })
    await nextTick()

    // console.log(wrapper.html())
    const wapper_html = wrapper.html()
    expect(wapper_html).toContain(`<div>5</div>`)
    expect(wapper_html).not.toContain(`<div>1</div>`)
    expect(wapper_html).not.toContain(`<div>2</div>`)
    expect(wapper_html).not.toContain(`<div>3</div>`)
    expect(wapper_html).not.toContain(`<div>4</div>`)
    expect(wapper_html).not.toContain(`<div>6</div>`)
    expect(wapper_html).not.toContain(`<div>7</div>`)
  })

  it('renders every paragraph', async () => {
    const contentText = `\
    <p>Line 1<br/>is 40 high <br/></p>
    <p>Line 2</p>
    <p>Line 3</p>
    `
    const wrapper = await mount(PassageComponent, {
      props: {
        global: {
          provide: {
            passage: { reset: () => null },
          },
        },
        every: 'p',
        testContentInjector: makeParagraphTestContentInjector(contentText),
      },
      slots: {
        default: contentText,
      },
    })
    await nextTick()
    const res_html = wrapper.html()
    // console.log(res_html)
    expect(res_html).toContain(`<div>1</div>`)
    expect(res_html).toContain(`<div>2</div>`)
    expect(res_html).toContain(`<div>3</div>`)
    expect(res_html).not.toContain(`<div>4</div>`)
    expect(res_html).not.toContain(`<div>5</div>`)
    expect(res_html).not.toContain(`<div>6</div>`)
  })
})
