<template>
  <div ref="container" class="demo-block">
    <div class="btns">
      <button @click="updateWater">更新水印</button>
      <button @click="clear">删除水印</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue'
import { useWatermark } from 'meng-ui-vue'
import type { WaterMarkProp } from 'meng-ui-vue'
const container = ref()
const text = '测试水印'
const { setWatermark, clear } = useWatermark(container)

const content = reactive<WaterMarkProp>({
  content: [text, new Date().toLocaleString()],
  font: {
    fontWeight: 'normal',
  },
})

const updateWater = () => {
  content.content = [text, new Date().toLocaleString()]
  setWatermark(toRaw(content))
}
onMounted(() => {
  setWatermark(toRaw(content))
})
</script>

<style scoped>
.demo-block {
  height: 400px;
  border: 1px solid #ccc;
  position: relative;
}

button {
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

button + button {
  margin-left: 8px;
}

.btns {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
