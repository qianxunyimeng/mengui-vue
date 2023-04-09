import {
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  shallowRef,
  unref,
} from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { Ref } from 'vue'

type attr = {
  font?: string
  fillStyle?: string
}

export function useWatermark(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>
) {
  // 绘制文字背景图
  function createBase64(str: string, attr?: attr) {
    const can = document.createElement('canvas')
    const width = 200
    const height = 140
    Object.assign(can, { width, height })

    const cans = can.getContext('2d')
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120)
      cans.font = attr?.font ?? '12px Reggae One'
      cans.fillStyle = attr?.fillStyle ?? 'rgba(0, 0, 0, 0.12)'
      cans.textAlign = 'left'
      cans.textBaseline = 'middle'
      cans.fillText(str, width / 20, height)
    }
    return can.toDataURL('image/png')
  }

  const id = '11111'
  const watermarkEl = shallowRef<HTMLElement>()

  // 绘制水印层
  const createWatermark = (str: string, attr?: attr) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str, attr })
      return id
    }
    const div = document.createElement('div')
    watermarkEl.value = div
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = '100000'
    const el = unref(appendEl)
    if (!el) return id
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ str, width, height, attr })
    el.appendChild(div)
    if (!unref(watermarkEl)) {
      obserMater()
    }

    return id
  }

  // 页面随窗口调整更新水印
  function updateWatermark(
    options: {
      width?: number
      height?: number
      str?: string
      attr?: attr
    } = {}
  ) {
    const el = unref(watermarkEl)
    if (!el) return
    if (options.width) {
      el.style.width = `${options.width}px`
    }
    if (options.height) {
      el.style.height = `${options.height}px`
    }
    if (options.str !== 'undefined') {
      el.style.background = `url(${createBase64(
        options.str || '',
        options.attr
      )}) left top repeat`
    }
  }

  // 对外提供的设置水印方法
  function setWatermark(str: string, attr?: attr) {
    createWatermark(str, attr)
    unref(appendEl)?.addEventListener('resize', func)
    const instance = getCurrentInstance()
    if (instance) {
      onBeforeUnmount(() => {
        clear()
      })
    }
  }

  // 清除水印
  const clear = () => {
    const domId = unref(watermarkEl)
    watermarkEl.value = undefined
    const el = unref(appendEl)
    if (!el) return
    domId && el.removeChild(domId)
    el.removeEventListener('resize', func)
  }

  const func = useThrottleFn(() => {
    const el = unref(appendEl)
    if (!el) return
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ height, width })
  }, 200)

  const obserMater = () => {
    observer.observe(unref(appendEl) as Node, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  const isMonitoring = (node: Node, record: MutationRecord) => {
    return (
      node === watermarkEl.value ||
      (record.type === 'attributes' && record.target === watermarkEl.value)
    )
  }

  const observer = new MutationObserver((mutationsList, _) => {
    mutationsList.forEach((item) => {
      if (item.removedNodes.length > 0) {
        item.removedNodes.forEach((removeNode) => {
          if (isMonitoring(removeNode, item)) {
            item.target.appendChild(removeNode)
          }
        })
      }
    })
  })

  return { setWatermark, clear }
}
