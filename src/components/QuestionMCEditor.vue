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
      default: 'preview',
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
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
      },
      myValue: this.value,
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
  },
}
</script>

