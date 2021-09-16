<template>
  <div>
    <h3>Content Editor</h3>
    <editor
      :init="initEditor"
      api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
      v-model="myValue"
    />
  </div>
</template>
<script lang="ts">
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: 'preview',
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | customInsertButton',
    },
  },
  data() {
    return {
      initEditor: {
        height: 400,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true,

        setup: (editor: any) => {
          editor.ui.registry.addButton('customInsertButton', {
            text: 'Create Passage Reference',
            onAction: (_: any) => {
              const selectedContent = editor.selection.getContent()
              if (!selectedContent) {
                alert('No selectioned text, please try again')
                return
              }
              editor.insertContent(`${this.refPattern}${selectedContent}`)
              this.onInputPassageRef()
            },
          })
        },
      },
      myValue: this.value,
      refPattern: '<a href="#passage-text-ref">🔗</a>',
      isPatternExist: false,
    }
  },
  mounted() {},
  methods: {
    clear() {
      this.myValue = ''
    },
    onInputPassageRef() {
      console.log('onInputPassageRef')
      this.isPatternExist = true
      this.$emit('insertPassageRef')
    },
    onRemovePassageRef() {
      console.log('removePassageRef')
      this.isPatternExist = false
      this.$emit('removePassageRef')
    },
    checkPassageReferenceIsExist(content: string) {
      return new RegExp(this.refPattern).test(content)
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
      if (this.isPatternExist && !this.checkPassageReferenceIsExist(newValue)) {
        this.onRemovePassageRef()
      }
    },
  },
}
</script>
