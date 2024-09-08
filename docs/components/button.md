---
title: Button | vc-ui
description: Button 组件的文档
---

# Button 按钮

常用的操作按钮

## 基础用法

使用`type`、`plain`、`round`、`circle`来定义按钮的样式。

<!-- <preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基本用法"></preview> -->

:::preview 基础用法 || Button 组件的基本用法

demo-preview=../demo/Button/Basic.vue

:::

## Button API

### Button Attributes

| 属性        | 介绍                | 类型                                                                             | 默认值 |
| ----------- | ------------------- | -------------------------------------------------------------------------------- | ------ |
| size        | 按钮大小            | `enum`-`'large'\| 'default'\| 'small' `                                          | —      |
| type        | 按钮类型            | `enum`-`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'\| 'text'(delete) ` | —      |
| plain       | 是否为朴素按钮      | `boolean`                                                                        | false  |
| round       | 是否为圆角按钮      | `boolean`                                                                        | false  |
| circle      | 是否为圆形按钮      | `boolean`                                                                        | false  |
| loading     | 是否为加载状态      | `boolean`                                                                        | false  |
| disabled    | 禁用按钮            | `boolean`                                                                        | false  |
| icon        | 设置按钮的图标组件  | `string` / `Component`                                                           | —      |
| autofocus   | 原生 autofocus 属性 | `boolean`                                                                        | false  |
| native-type | 原生 `type` 属性    | `enum`-`'button'\| 'submit'\| 'reset' `                                          | button |
