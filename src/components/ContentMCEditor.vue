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
      default: 'preview paste',
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo | formatselect | bold italic forecolor backcolor | passageLink | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
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
            'bold italic underline strikethrough superscript subscript codeformat | formats blockformats align | forecolor backcolor | removeformat | passageLink',
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
        invalid_styles: 'font-size font-family',
        paste_as_text: true,
        setup: (editor: any) => {
          // passage Link Button
          editor.ui.registry.addButton('passageLink', {
            icon: 'link',
            tooltip: 'Create Passage Reference',
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
      refPattern: '<a id="text-ref"></a>',
      isPatternExist: false,
    }
  },
  mounted() {},
  methods: {
    clear() {
      this.myValue = ''
    },
    onInputPassageRef() {
      this.isPatternExist = true
      this.$emit('insertPassageRef')
    },
    onRemovePassageRef() {
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
