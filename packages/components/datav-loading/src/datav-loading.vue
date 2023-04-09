<!-- 大屏加载loading -->
<template>
  <div class="datav-loading">
    <!-- preserveAspectRatio="xMidYMid meet 居中-->
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 50 50"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- stroke-dasharry=2pir/4=2*3.1415926*22/4=34 -->
      <!-- animateTransform的from，to可以用value代替 -->
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="outsideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="insideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="datav-loading-content">
      <slot>Loding...</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { datavLoadingProps } from './datav-loading'
defineOptions({
  name: 'MxDatavLoading',
})
const props = defineProps(datavLoadingProps)

const outsideColorAnimation = computed(
  () => `${props.outsideColor};${props.insideColor};${props.outsideColor};`
)
const insideColorAnimation = computed(
  () => `${props.insideColor};${props.outsideColor};${props.insideColor};`
)
</script>
