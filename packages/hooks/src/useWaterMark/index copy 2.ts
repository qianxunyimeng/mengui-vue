import {
  getCurrentInstance,
  mergeProps,
  onBeforeUnmount,
  ref,
  shallowRef,
  unref,
} from 'vue'
import { useResizeObserver, useThrottleFn } from '@vueuse/core'
import { getPixelRatio, getStyleStr, rotateWatermark } from './util'
import type { CSSProperties, Ref } from 'vue'

const BaseSize = 2
const FontGap = 3

// 默认水印设置
const defaultProp: WaterMarkProp = {
  zIndex: 9,
  rotate: -22,
  content: 'MengUI',
  gap: [100, 100],
}

const stopObservation = ref(false)

export type WaterMarkProp = {
  zIndex?: number
  rotate?: number
  /** 水印宽度 */
  width?: number
  /** 水印高度 */
  height?: number
  /** 水印内容 */
  content?: string | string[]
  /** 图片水印 图片src */
  image?: string
  font?: {
    color?: string
    fontSize?: number | string
    fontWeight?: 'normal' | 'light' | 'weight' | number
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
    fontFamily?: string
  }
  style?: CSSProperties
  /** 水印之间的间距 */
  gap?: [number, number]
  /** 水印距左上角的偏移量 */
  offset?: [number, number]
}

export function useWatermark(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>
) {
  let mergeProp: WaterMarkProp = {
    gap: [100, 100],
  }

  let gapXCenter = 0
  let gapYCenter = 0
  let offsetLeft = gapXCenter
  let offsetTop = gapYCenter

  // 水印宽高
  const getMarkSize = (ctx: CanvasRenderingContext2D) => {
    let defaultWidth = 120
    let defaultHeight = 64

    if (!mergeProp.image && ctx.measureText) {
      ctx.font = `${Number(mergeProp.font?.fontSize)}px ${
        mergeProp.font?.fontFamily
      }`
      const contents = Array.isArray(mergeProp.content)
        ? mergeProp.content
        : [mergeProp.content]
      const widths = contents.map((item) => ctx.measureText(item!).width)
      defaultWidth = Math.ceil(Math.max(...widths))
      defaultHeight =
        Number(mergeProp.font?.fontSize) * contents.length +
        (contents.length - 1) * FontGap
    }
    return [
      mergeProp.width ?? defaultWidth,
      mergeProp.height ?? defaultHeight,
    ] as const
  }
  const getMarkStyle = () => {
    const markStyle: CSSProperties = {
      zIndex: mergeProp.zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
    }

    let positionLeft = offsetLeft - gapXCenter
    let positionTop = offsetTop - gapYCenter
    if (positionLeft > 0) {
      markStyle.left = `${positionLeft}px`
      markStyle.width = `calc(100% - ${positionLeft}px)`
      positionLeft = 0
    }
    if (positionTop > 0) {
      markStyle.top = `${positionTop}px`
      markStyle.height = `calc(100% - ${positionTop}px)`
      positionTop = 0
    }
    markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`

    return markStyle
  }

  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (appendEl.value && watermarkRef.value) {
      const [gapX] = mergeProp.gap!
      stopObservation.value = true
      watermarkRef.value.setAttribute(
        'style',
        getStyleStr({
          ...getMarkStyle(),
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${(gapX + markWidth) * BaseSize}px`,
        })
      )
      appendEl.value?.append(watermarkRef.value)
      setTimeout(() => {
        stopObservation.value = false
      })
    }
  }

  // 填充文本
  const fillTexts = (
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number
  ) => {
    const ratio = getPixelRatio()
    const mergedFontSize = Number(mergeProp.font!.fontSize) * ratio
    ctx.font = `${mergeProp.font!.fontStyle} normal ${
      mergeProp.font!.fontWeight
    } ${mergedFontSize}px/${drawHeight}px ${mergeProp.font!.fontFamily}`
    ctx.fillStyle = mergeProp.font!.color!
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.translate(drawWidth / 2, 0)
    const contents = Array.isArray(mergeProp.content)
      ? mergeProp.content
      : [mergeProp.content]
    contents?.forEach((item, index) => {
      ctx.fillText(
        item ?? '',
        drawX,
        drawY + index * (mergedFontSize + FontGap * ratio)
      )
    })
  }

  // 绘制水印文本
  const drawText = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    alternateRotateX: number,
    alternateRotateY: number,
    alternateDrawX: number,
    alternateDrawY: number,
    markWidth: number
  ) => {
    fillTexts(ctx, drawX, drawY, drawWidth, drawHeight)
    /** Fill the interleaved text after rotation */
    ctx.restore()
    rotateWatermark(ctx, alternateRotateX, alternateRotateY, mergeProp.rotate!)
    fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight)
    appendWatermark(canvas.toDataURL(), markWidth)
    console.log(watermarkRef.value)
    if (unref(watermarkRef)) {
      console.log('jiankong')
      obserMater()
    }
  }

  const watermarkRef = shallowRef<HTMLElement>()

  const destroyWatermark = () => {
    if (watermarkRef.value) {
      watermarkRef.value.remove()
      watermarkRef.value = undefined
    }
  }

  // 绘制水印层
  const createWatermark = () => {
    const [gapX, gapY] = mergeProp.gap!
    gapXCenter = gapX / 2
    gapYCenter = gapY / 2
    offsetLeft = mergeProp.offset?.[0] ?? gapXCenter
    offsetTop = mergeProp.offset?.[1] ?? gapYCenter

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      if (!watermarkRef.value) {
        watermarkRef.value = document.createElement('div')
      }
      // dpr
      const ratio = getPixelRatio()
      const [markWidth, markHeight] = getMarkSize(ctx)
      const canvasWidth = (gapX + markWidth) * ratio
      const canvasHeight = (gapY + markHeight) * ratio
      canvas.setAttribute('width', `${canvasWidth * BaseSize}px`)
      canvas.setAttribute('height', `${canvasHeight * BaseSize}px`)

      const drawX = (gapX * ratio) / 2
      const drawY = (gapY * ratio) / 2
      const drawWidth = markWidth * ratio
      const drawHeight = markHeight * ratio
      const rotateX = (drawWidth + gapX * ratio) / 2
      const rotateY = (drawHeight + gapY * ratio) / 2
      /** Alternate drawing parameters */
      const alternateDrawX = drawX + canvasWidth
      const alternateDrawY = drawY + canvasHeight
      const alternateRotateX = rotateX + canvasWidth
      const alternateRotateY = rotateY + canvasHeight

      ctx.save()
      rotateWatermark(ctx, rotateX, rotateY, mergeProp.rotate!)

      if (mergeProp.image) {
        // TODO 图片水印
      } else {
        drawText(
          canvas,
          ctx,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
          alternateRotateX,
          alternateRotateY,
          alternateDrawX,
          alternateDrawY,
          markWidth
        )
      }
    }
  }

  // 对外提供的设置水印方法
  function setWatermark(prop: WaterMarkProp) {
    const {
      zIndex,
      rotate,
      width,
      height,
      content,
      image,
      font,
      style,
      gap,
      offset,
    } = prop

    mergeProp = {
      zIndex: zIndex ?? defaultProp.zIndex,
      rotate: rotate ?? defaultProp.rotate,
      width,
      height,
      content: content ?? defaultProp.content,
      gap: gap ?? defaultProp.gap,
      font: {
        color: font?.color ?? 'rgba(0,0,0,.15)',
        fontSize: font?.fontSize ?? 16,
        fontWeight: font?.fontWeight ?? 'normal',
        fontStyle: font?.fontStyle ?? 'normal',
        fontFamily: font?.fontFamily ?? 'sans-serif',
      },
      style,
      offset,
      image,
    }
    createWatermark()
  }

  // 清除水印
  const clear = () => {
    //
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((item) => {
      console.log(item)
      if (item.removedNodes.length > 0) {
        item.removedNodes.forEach((removeNode) => {
          if (isMonitoring(removeNode, item)) {
            item.target.appendChild(removeNode)
          }
        })
      }
    })
  })

  const obserMater = () => {
    observer.observe(unref(appendEl) as Node, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  const isMonitoring = (node: Node, record: MutationRecord) => {
    return (
      node === watermarkRef.value ||
      (record.type === 'attributes' && record.target === watermarkRef.value)
    )
  }

  return { setWatermark, clear }
}
