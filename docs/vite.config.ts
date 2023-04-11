import path from 'path'
import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { projRoot } from '@meng-ui-vue/build-utils'
import type { Alias } from 'vite'
const alias: Alias[] = []
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^meng-ui-vue(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/meng-ui-vue/index.ts'),
    },
    {
      find: /^meng-ui-vue\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig({
  plugins: [VueJsx(), DefineOptions()],
  server: {
    port: 3300,
  },
  resolve: {
    alias,
  },
})
