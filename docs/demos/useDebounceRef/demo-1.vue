<!--  -->
<template>
  <div class="demo-block">
    <input v-model="content" /><br />
    搜索关键词：{{ content }}
  </div>
</template>
<script setup lang="ts">
import { useDebounceRef } from 'meng-ui-vue'
const content = useDebounceRef('', 2000)
</script>

<style scoped>
input {
  width: 200px;
  border: 1px solid #ccc;
}
</style>
