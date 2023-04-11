import installer from './defaults'
export * from '@meng-ui-vue/components'
export * from '@meng-ui-vue/constants'
export * from '@meng-ui-vue/directives'
export * from '@meng-ui-vue/hooks'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
