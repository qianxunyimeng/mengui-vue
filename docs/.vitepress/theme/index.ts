import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import MengUI from 'mengui-vue'
import '.././././../../packages/theme-chalk/src/index.scss'

import type { EnhanceAppContext } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    //ctx.app.use(ElementPlus)
    ctx.app.use(MengUI)
    ctx.app.component('demo-preview', AntDesignContainer)
  },
}
