import { componentSizeMap } from '@meng-ui-vue/constants'

import type { ComponentSize } from '@meng-ui-vue/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
