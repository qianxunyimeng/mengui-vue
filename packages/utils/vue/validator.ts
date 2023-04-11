import { componentSizes, datePickTypes } from '@meng-ui-vue/constants'
import type { ComponentSize, DatePickType } from '@meng-ui-vue/constants'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

export const isValidDatePickType = (val: string): val is DatePickType =>
  ([...datePickTypes] as string[]).includes(val)
