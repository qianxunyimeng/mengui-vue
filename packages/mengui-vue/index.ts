import installer from './defaults'
export * from '@mengui-vue/components'
export * from '@mengui-vue/constants'
export * from '@mengui-vue/directives'
export * from '@mengui-vue/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
