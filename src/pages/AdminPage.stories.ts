import AdminPage from './AdminPage.vue'
import Text from '../components/Text.vue'
import Passage from '../components/Passage.vue'
import Question from '../components/Question'
import Reference from '../components/Reference.vue'

export default {
  title: 'Test Taker/Admin Page',
  component: Text,
}

const Template1 = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AdminPage },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <AdminPage />   
  `,
})

const Template2 = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Text, Passage, Question, Reference },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  
  <Passage>
    <h3>Question</h3>
    <Question>     
     ${args.question}
    </Question>
    <h3> Content </h3>
    <Text :every="args.every">
      ${args.content}   
    </Text>
  </Passage>
  `,
})

export const SavePassageProblem = Template1.bind({})
export const LoadPassageProblemFromLocalStorage = Template2.bind({})

const passage = JSON.parse(localStorage.getItem('passage') || '{}')

const content = passage.content || ''
const question = passage.question || ''
LoadPassageProblemFromLocalStorage.args = {
  every: 1,
  question: question.split('🔗').join(''),
  content: content.split('🔗').join(''),
}
