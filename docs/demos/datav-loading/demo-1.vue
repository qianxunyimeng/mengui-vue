<template>
  <div ref="container" class="demo-block">
    <mx-datav-loading>
      <div class="loading-text">数据大屏加载中...</div>
    </mx-datav-loading>
  </div>
</template>

<script lang="ts" setup>
import { MxDatavLoading } from 'mengui-vue'
</script>

<style scoped lang="scss">
.demo-block {
  height: 200px;
  border: 1px solid #ccc;
  position: relative;
  background-color: #314179;
}
.datav-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading-text {
  color: #ccc;
}
</style>
