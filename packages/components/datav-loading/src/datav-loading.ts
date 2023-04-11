import { buildProps } from '@meng-ui-vue/utils'
import type { ExtractPropTypes } from 'vue'

export const datavLoadingProps = buildProps({
  /**
   * @description
   */
  width: {
    type: [Number, String],
    default: 50,
  },
  height: {
    type: [Number, String],
    default: 50,
  },
  outsideColor: {
    type: String,
    default: '#3be6cd',
  },
  insideColor: {
    type: String,
    default: '#02bcfe',
  },
  duration: {
    type: [Number, String],
    default: 2,
  },
} as const)

export type DatavLoadingProps = ExtractPropTypes<typeof datavLoadingProps>
