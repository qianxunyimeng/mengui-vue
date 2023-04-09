import { customRef } from 'vue'

/**
 * 防抖功能的ref
 * @param value
 * @param delay
 * @returns
 */
export function useDebounceRef(value: any, delay = 200) {
  return customRef((track, trigger) => {
    let timeId: any = null
    return {
      get() {
        track() // 依赖收集
        return value
      },
      set(val) {
        if (timeId !== null) {
          // 清空定时器
          clearTimeout(timeId)
        }
        const callNow = !timeId
        timeId = setTimeout(() => {
          value = val
          trigger() // 派发
          timeId = null
        }, delay)

        // 会立即执行一次
        if (callNow) {
          value = val
          trigger() // 派发
        }
      },
    }
  })
}
