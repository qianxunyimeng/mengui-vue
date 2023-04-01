// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MxButton: typeof import('mengui-vue')['MxButton']
  }

  interface ComponentCustomProperties {}
}

export {}
