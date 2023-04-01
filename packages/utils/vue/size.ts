import { componentSizeMap } from '@mengui-vue/constants'

import type { ComponentSize } from '@mengui-vue/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
