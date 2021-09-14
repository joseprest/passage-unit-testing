import { mount } from '@vue/test-utils'
import Passage from '@/components/Passage.vue'

describe('Passage', () => {
  it('renders single line numbers', () => {
    const wrapper = mount(Passage, {
      slots: {
        default: `
        <Text>
          <p>Line 1</p>
          <p>Line 2</p>
        </Text>
      `,
      },
    })
    // const wrapper = mount(Text, )
    console.log(wrapper.html())
    // expect(wrapper.html()).toBe(`
    //   <div class="line-numbers">
    //     <div>1</div>
    //     <div>2</div>
    //   </div>
    //   <div class="content" style="line-height: 20px;">
    //     <p>Line 1</p>
    //     <p>Line 2</p>
    //   </div>
    //     `)
  })
})
