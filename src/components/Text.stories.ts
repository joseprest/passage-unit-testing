import Text from './Text.vue'

export default {
  title: 'Test Taker/Line Number Test',
  component: Text,
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Text },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
      <Text v-bind="args">
        <p>Paragraph 1: good</p>
        <p>Paragraph 2: abso-<br />lutely, <br /> this is test</p>
        <p>Paragraph 3: free</p>
        <p>Paragraph 4: snore</p>
        <p>Paragraph 5: alive</p>
        <p>Paragraph 6: drips</p>
      </Text>
  `,
})

export const EveryLine = Template.bind({})
EveryLine.args = {
  every: 1,
}

export const EveryFiveLines = Template.bind({})
EveryFiveLines.args = {
  every: 5,
}

export const EveryParagraph = Template.bind({})
EveryParagraph.args = {
  every: 'p',
}
