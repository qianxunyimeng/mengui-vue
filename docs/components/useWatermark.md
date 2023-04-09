---
title: useWatermark
lang: zh-CN
---

# useWatermark

给页面某区域添加水印,默认父容器为body，在使用时可以指定父容器，返回两个函数，setWatermark：用于设置水印内容，clear用于删除水印

## 示例

<preview path="../demos/useWatermark/demo-1.vue" title="基本使用" description=""></preview>

## API

### WaterMarkProp

|   属性名称     | 说明     | 类型    |    默认值   |
|  -------     | ------- | ------- | ------- |
| zIndex       | z-index | number  | 9     |
| rotate       | 旋转角度 | number  |  -22    |
| content       | 水印文本内容 | string ｜ string[]  | MengUI     |
| font       | 水印文本字体 | 详情见 `WaterMarkFontProp`  |      |

### WaterMarkFontProp

|   属性名称     | 说明     | 类型    |    默认值   |
|  -------     | ------- | ------- | ------- |
| color       | 字体颜色 | rgba  | rgba(0,0,0,.15)     |
| fontSize       | 字体大小 | number  |  16   |
| fontWeight       | fontWeight| 'normal', 'light' ,'weight' ,'number'  | normal    |
| fontStyle       | fontStyle| 'none' , 'normal' ,'italic' ,'oblique'  |  normal    |
| fontFamily       | fontFamily| string  |  sans-serif    |


