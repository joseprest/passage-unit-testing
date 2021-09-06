<script lang="ts">
import { reactive } from 'vue'
import ReadingPassage from './Text.vue'
import ReadingPassageReference from './Reference.vue'

export default {
  components: {
    ReadingPassage,
    ReadingPassageReference,
  },
  provide: {
    readingPassage: reactive({
      reset() {
        this.references = {}
      },
      references: {},
    }),
  },
}
</script>