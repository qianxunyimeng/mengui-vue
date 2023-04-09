import { customRef } from 'vue'

export function useThrottleRef(value: any, delay = 200) {
  return customRef((track, trigger) => {
    let timeId: any = null
    return {
      get() {
        track() // 依赖收集
        return value
      },
      set(val) {
        value = val
        timeId = setTimeout(() => {
          console.log('派发')
          value = val
          trigger() // 派发
          timeId = null
        }, delay)
      },
    }
  })
}
