import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
//import MengUI from 'meng-ui-vue'
import '.././././../../packages/theme-chalk/src/index.scss'

import type { EnhanceAppContext } from 'vitepress'

export default {
  ...DefaultTheme,
  // enhanceApp(ctx: EnhanceAppContext) {
  //   ctx.app.use(MengUI)
  //   ctx.app.component('demo-preview', AntDesignContainer)
  // },
  enhanceApp: async (ctx: EnhanceAppContext) => {
    const { app } = ctx
    app.component('DemoPreview', AntDesignContainer)
    app.mixin({
      async mounted() {
        // import('meng-ui-vue').then((module) => {
        //   app.use(module)
        // })
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        // const MengUI = require('meng-ui-vue')
        // app.use(MengUI)
      },
    })
  },
}
