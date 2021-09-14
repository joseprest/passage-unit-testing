import { mount } from '@vue/test-utils'
// import Text from '@/components/Text.vue'
import Passage from '@/components/Passage.vue'

describe('Passage.vue', () => {
  it('renders single line numbers', () => {
    // const wrapper = mount(Text, {
    //   slots: {
    //     default: `
    //   <p>Line 1</p>
    //   <p>Line 2</p>
    //   `,
    //   },
    // })
    const wrapper = mount(Passage)
    console.log(wrapper.html())
    //     expect(wrapper.html()).toBe(`
    //   <div class="line-numbers">
    //     <div>1</div>
    //     <div>2</div>
    //   </div>
    //   <div class="content" style="line-height: 20px;">
    //     <p>Line 1</p>
    //     <p>Line 2</p>
    // </div>
    //     `)
  })
})
