// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    MxButton: typeof import('../packages/mengui-vue')['MxButton']
  }

  interface ComponentCustomProperties {}
}

export {}
