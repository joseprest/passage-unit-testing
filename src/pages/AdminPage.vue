<template>
  <div>
    <div class="tinymce-editors">
      <ContentMCEditor
        @input="onUpdateContent"
        @insertPassageRef="onInsertPassageRef"
        @removePassageRef="onRemovePassageRef"
        :value="contentValue"
      />
      <QuestionMCEditor @input="onUpdateQuestion" :value="questionValue" />
    </div>
    <div class="actions-group">
      <button class="btn btn-primary" @click="onSavePassageProblem">
        Save
      </button>
      <button class="btn btn-primary" @click="onLoadPassageProblem">
        Load
      </button>
      <button class="btn btn-primary" @click="onClearPassageProblem">
        Clear
      </button>
    </div>
    <div class="result-section">
      <div>
        <h1>Question</h1>
        <div>{{ questionValue }}</div>
      </div>
      <div>
        <h1>Content</h1>
        <div>{{ contentValue }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ContentMCEditor from '../components/ContentMCEditor.vue'
import QuestionMCEditor from '../components/QuestionMCEditor.vue'

export default {
  components: {
    ContentMCEditor,
    QuestionMCEditor,
  },
  data() {
    return {
      contentValue: '',
      questionValue: '',
      questionRef: '<a href="#passage-text-ref">🔗</a>',
    }
  },
  methods: {
    onUpdateContent(value: string) {
      this.contentValue = value
    },
    onInsertPassageRef() {
      this.questionValue = this.questionRef + this.questionValue
      console.log('[questionValue]', this.questionValue)
    },
    onRemovePassageRef() {
      this.questionValue = this.questionValue.split(this.questionRef).join('')
    },
    onUpdateQuestion(value: string) {
      this.questionValue = value
    },
    onSavePassageProblem() {
      localStorage.setItem(
        'passage',
        JSON.stringify({
          content: this.contentValue,
          question: this.questionValue,
        })
      )
    },
    onLoadPassageProblem() {
      try {
        const { content, question } = JSON.parse(
          localStorage.getItem('passage') || '{}'
        )
        if (content) {
          this.contentValue = content
        }
        if (question) {
          this.questionValue = question
        }
      } catch (error) {}
    },
    onClearPassageProblem() {
      localStorage.removeItem('passage')
    },
  },
}
</script>
<style scoped>
.tinymce-editors {
  display: flex;
}
.tinymce-editors div {
  flex: 50%;
}
.actions-group {
  margin-top: 20px;
  margin-bottom: 20px;
}
.btn {
  width: 80px;
  height: 30px;
  margin: 10px 10px;
}
</style>