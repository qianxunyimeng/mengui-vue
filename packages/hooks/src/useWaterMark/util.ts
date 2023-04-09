import type { CSSProperties } from 'vue'

export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}
export function getStyleStr(style: CSSProperties): string {
  return Object.keys(style)
    .map((key: string) => {
      return `${toLowercaseSeparator(key)}: ${
        style[key as keyof CSSProperties]
      };`
    })
    .join(' ')
}

/** 获取dpr(设备物理像素 与css像素 的比值) */
export function getPixelRatio() {
  return window.devicePixelRatio || 1
}

/** 水印旋转角度 */
export function rotateWatermark(
  ctx: CanvasRenderingContext2D,
  rotateX: number,
  rotateY: number,
  rotate: number
) {
  // canvas中心点的位置
  ctx.translate(rotateX, rotateY)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  ctx.translate(-rotateX, -rotateY)
}
