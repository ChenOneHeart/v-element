# Switch 组件需求分析

## 需求分析

支持基础切换功能

### 功能变体

- 在按钮旁边设置文字描述（按钮内，按扭外）
- 自定义状态图标（内部和外部）
- 自定义动作图标
- 自定义操作按钮
- 接收不同的数据类型（boolean string number）

### 样式

- 尺寸
- 禁用状态
- 加载状态

### 操作

- 切换前支持绑定事件

## 代码设计

### 接口

```ts
interface SwitchProps {
  modelValue: boolean | string | number;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeIcon: VNode;
  inactiveIcon: VNode;
  activeValue?: boolean | string | number;
  inactiveValue?: boolean | string | number;
  activeActionIcon?: VNode;
  inactiveActionIcon?: VNode;
}
interface SwitchEmits {
  (e: "change", value: boolean | string | number): void;
}
interface SwitchInstance {
  focus: () => void;
}
```

### slots 插槽

active-icon 激活按钮内部插槽
inactive-icon 未激活按钮内部插槽

### props 参数

### emits 事件

### 实例属性和实例方法

## 代码编写

### 创建基础文件

### HTML 结构，CSS 类和属性

div=> types=> :class=> attrs

### 分析数据结构

### 添加功能

### 添加事件

### 添加基础样式

### 添加动画

### 补充和遗漏
