---
title: Tooltip | V-Element
description: Tooltip 组件的文档
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 4 种不同方向的展示方式。

使用 content 属性设置触发的文字提示。 由 placement 属性决定展示效果： placement属性值为：top、left、right、bottom。

<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 基础用法"></preview>

## Trigger触发方式

使用trigger属性设置不同的触发方式，有`click`和`hover`两种，默认为`click`。

<preview path="../demo/Tooltip/Trigger.vue" title="基础用法" description="Trigger触发方式"></preview>

## Delay延迟触发

可以通过`show-delay`控制展示延迟时间（鼠标悬浮n秒后触发），通过`hide-delay`控制关闭延迟时间（鼠标离开n秒后触发）,单位为毫秒。

<preview path="../demo/Tooltip/Delay.vue" title="基础用法" description="Delay延迟触发"></preview>

## Manual手动触发

使用Manual属性设置手动触发，通过组件实例上的`show`和`hide`方法控制弹窗的开启和隐藏`。

<preview path="../demo/Tooltip/Manual.vue" title="基础用法" description="Manual手动触发"></preview>
