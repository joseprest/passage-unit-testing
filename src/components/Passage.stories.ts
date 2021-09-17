import Text from './Text.vue'
import Passage from './Passage.vue'
import Question from './Question'
import Reference from './Reference.vue'

export default {
  title: 'Test Taker/Passage counting',
  component: Text,
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Text, Passage, Question, Reference },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <Passage>
      <Question>
        On line <a href="#passage-text-ref1"></a>, the author talks about
        something. What do they mean <a href="#passage-text-ref2"></a>?
      </Question>
      <Text :every="args.every">
        <p>Paragraph 1: good</p>
        <p>Paragraph 2: abso-<br />lutely, <br /> this is test</p>
        <p>Paragraph 3: free</p>
        <p>Paragraph 4: <a id="text-ref1"></a>snore</p>
        <p>Paragraph 5: alive</p>
        <p>Paragraph 6: <a id="text-ref2"></a>snore</p>
      </Text>
    </Passage>
  `,
})

export const LineReference = Template.bind({})
LineReference.args = {
  every: 1,
}

export const ParagraphReference = Template.bind({})
ParagraphReference.args = {
  every: 'p',
}
