//import { REPO_BRANCH, REPO_PATH } from '@mengui-vue/build-constants'
//import { docsDirName } from '@mengui-vue/build-utils'
import {
  componentPreview,
  containerPreview,
} from '@vitepress-demo-preview/plugin'
import { head, nav, sidebar } from './config'
import type { UserConfig } from 'vitepress'

export const config: UserConfig = {
  title: 'MengUI',
  description: '一个基于Vue3的PC端组件库',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  head,
  themeConfig: {
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    logo: '/images/element-plus-logo.svg',
    logoSmall: '/images/element-plus-logo-small.svg',
    sidebar,
    nav,
    //features,
    //langs: languages,
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview)
      md.use(containerPreview)
    },
  },
}

export default config
