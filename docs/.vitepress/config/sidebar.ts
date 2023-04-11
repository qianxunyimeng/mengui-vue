import { components } from './components'
import { hooks } from './hooks'
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/guide': [
    {
      text: '指南',
      items: [
        { text: '组件库介绍', link: '/guide/' },
        { text: '安装', link: '/guide/install' },
        { text: '快速开始', link: '/guide/quickstart' },
      ],
    },
  ],
  '/components': [
    {
      items: [...components],
    },
  ],
  '/hooks': [
    {
      items: [...hooks],
    },
  ],
}
