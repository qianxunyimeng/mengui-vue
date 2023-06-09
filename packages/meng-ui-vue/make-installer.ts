//import { provideGlobalConfig } from '@meng-ui-vue/components/config-provider'
import { INSTALLED_KEY } from '@meng-ui-vue/constants'
import { version } from './version'

import type { App, Plugin } from '@vue/runtime-core'
// import type { ConfigProviderContext } from '@meng-ui-vue/components/config-provider'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: any) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    //if (options) provideGlobalConfig(options, app, true)
  }

  return {
    version,
    install,
  }
}
