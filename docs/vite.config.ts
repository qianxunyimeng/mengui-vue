import path from 'path'
import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import {
  docPackage,
  epPackage,
  getPackageDependencies,
  projRoot,
} from '@mengui-vue/build-utils'
import type { Alias } from 'vite'
const alias: Alias[] = []
console.log('projRoot:', projRoot)
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^mengui-vue(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/mengui-vue/index.ts'),
    },
    {
      find: /^mengui-vue\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig({
  plugins: [VueJsx()],
  server: {
    port: 3300,
  },
  resolve: {
    alias,
  },
})
