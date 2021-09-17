import Text from './Text.vue'
import Passage from './Passage.vue'
import Question from './Question'
import Reference from './Reference.vue'

export default {
  title: 'Test Taker/Daynamic Passage',
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
        ${args.question}
      </Question>
      <Text :every="args.every">
        ${args.content}
      </Text>
    </Passage>
  `,
})

export const Default = Template.bind({})
Default.args = {
  every: 1,
  question: `On line <a href="#passage-text-ref"></a>, the author talks about
    something. What do they mean?`,
  content: `<p>Paragraph 1: good</p>
    <p>Paragraph 2: abso-<br />lutely, <br /> this is test</p>
    <p>Paragraph 3: free</p>
    <p>Paragraph 4: <a id="text-ref"></a>snore</p>
    <p>Paragraph 5: alive</p>
    <p>Paragraph 6: snore</p>`,
}
