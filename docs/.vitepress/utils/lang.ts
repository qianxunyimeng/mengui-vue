import { log } from 'console'
import fs from 'fs'
import path, { resolve } from 'path'
//import { docRoot } from '@meng-ui-vue/build-utils'

const docRoot = resolve(__dirname, '..', '..', '..', 'docs')
console.log('docRoot:', docRoot)
export const languages = fs.readdirSync(path.resolve(__dirname, '../crowdin'))

export const ensureLang = (lang: string) => `/${lang}`

export const getLang = (id: string) =>
  path.relative(docRoot, id).split(path.sep)[0]
