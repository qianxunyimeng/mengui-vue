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
  base: '/mengui-vue/',
  //base: '/',
  lastUpdated: true,
  head,
  themeConfig: {
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    logo: '/images/mengui.png',
    logoSmall: '/images/meng-ui-logo-small.svg',
    sidebar,
    nav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/qianxunyimeng/mengui-vue' },
      {
        icon: {
          svg: '<svg t="1681220426677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1813" width="64" height="64"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="1814"></path></svg>',
        },
        link: 'https://gitee.com/sql123z/mengui-vue',
      },
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
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
