// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    MxButton: typeof import('../packages/meng-ui-vue')['MxButton']
    MxDatavLoading: typeof import('../packages/meng-ui-vue')['MxDatavLoading']
  }
}

export {}
