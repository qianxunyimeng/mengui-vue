---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用 meng-ui-vue。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import MengUI from 'meng-ui-vue'
import 'meng-ui-vue/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(MengUI)
app.mount('#app')
```

#### Volar 支持

如果您使用 Volar, 请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["meng-ui-vue/global"]
  }
}
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。

#### 自动导入 推荐

首先您需要安装`unplugin-vue-components` 和 `unplugin-auto-import`.

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后在`Vite` 或 `Webpack`配置文件添加以下代码

##### Vite

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        (name) => {
          const esComponentsFolder = "meng-ui-vue/es/components";
          const dirName = name
            .slice(2)
            .match(
              /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .map((x) => x.toLowerCase())
            .join("-");
          if (name.match(/^Mx[A-Z]/))
            return {
              name,
              from: "meng-ui-vue/es",
              sideEffects: `${esComponentsFolder}/${dirName}/style/css`,
            };
        },
      ],
    }),
    vue(),
  ],
});

```

##### Webpack

```ts
// webpack.config.js
import AutoImport from 'unplugin-auto-import/webpack'
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        (name) => {
          const esComponentsFolder = "meng-ui-vue/es/components";
          const dirName = name
            .slice(2)
            .match(
              /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .map((x) => x.toLowerCase())
            .join("-");
          if (name.match(/^Mx[A-Z]/))
            return {
              name,
              from: "meng-ui-vue/es",
              sideEffects: `${esComponentsFolder}/${dirName}/style/css`,
            };
        },
      ],
    }),
  ],
}
```

更多打包方式 ([Rollup](https://rollupjs.org/), [Vue CLI](https://cli.vuejs.org/)) 配置方式请参考 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation) and [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#install).

