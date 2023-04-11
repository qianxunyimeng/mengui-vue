// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MxDatavLoading: typeof import('meng-ui-vue')['MxDatavLoading']
  }
}

export {}
