<template>
  <div>
    <h3>Question Editor</h3>
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
      default: 'preview paste',
    },
    refInserted: {
      type: Boolean,
      default: false,
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo | formatselect | bold italic forecolor backcolor | passageLink | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table',
    },
    menubar: {
      type: Object,
      default: {
        file: { title: 'File', items: 'newdocument' },
        edit: {
          title: 'Edit',
          items: 'undo redo | cut copy paste pastetext | selectall',
        },
        format: {
          title: 'Format',
          items:
            'bold italic underline strikethrough superscript subscript codeformat | formats blockformats align | forecolor backcolor | removeformat',
        },
      },
    },
  },
  data() {
    return {
      initEditor: {
        height: 400,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menu: this.menubar,
        setup: (editor: any) => {
          this.editor = editor
        },
      },
      myValue: this.value,
      editor: {
        type: [Object],
        default: null,
      },
      questionRef: '<a href="#passage-text-ref">🔗</a>',
    }
  },
  mounted() {},
  methods: {
    clear() {
      this.myValue = ''
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    },
    refInserted(val) {
      if (this.editor) {
        if (val) {
          this.editor.insertContent(this.questionRef)
        } else {
          this.myValue = this.myValue.split(this.questionRef).join('')
        }
      }
    },
  },
}
</script>

