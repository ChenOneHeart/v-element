---
title: Dropdown | V-Element
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单

折叠面板包含 `基础用法`, `手风琴`，通过折叠面板可以收纳内容区域，作为常规的数据展示组件。

## 基础用法

可同时展开或折叠多个面板，面板之间互不影响

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 基础用法"></preview>

## 位置

设置 placement 属性，使下拉菜单出现在不同位置。

<preview path="../demo/Dropdown/Placement.vue" title="位置" description="Dropdown 位置"></preview>

## 触发方式

可以配置点击激活或者悬停激活。`trigger` 属性有两个选项，分别为 `click`和`hover`。

<preview path="../demo/Dropdown/Trigger.vue" title="触发方式" description="Dropdown 触发方式"></preview>

## 延迟触发

可以通过`show-delay`控制展示延迟时间（鼠标悬浮n秒后触发），通过`hide-delay`控制关闭延迟时间（鼠标离开n秒后触发）。

<preview path="../demo/Dropdown/Delay.vue" title="延迟触发" description="Dropdown 延迟触发"></preview>

## 手动触发

通过`manual`属性设置手动触发。

<preview path="../demo/Dropdown/Manual.vue" title="手动触发" description="Dropdown 手动触发"></preview>