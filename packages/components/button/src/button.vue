<template>
  <button class="demo-button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'MxButton',
  props: {
    mode: String,
  },
  setup(props) {
    onMounted(() => {
      console.log(props)
    })

    return {}
  },
})
</script>
