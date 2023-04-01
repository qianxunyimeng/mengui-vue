import { createApp } from 'vue'
import '@mengui-vue/theme-chalk/src/dark/css-vars.scss'
import MengUI from 'mengui-vue'
import '@mengui-vue/theme-chalk/src/index.scss'
;(async () => {
  const apps = import.meta.glob('./src/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }
  const App = (await file()).default
  const app = createApp(App)
  app.use(MengUI)

  app.mount('#play')
})()
