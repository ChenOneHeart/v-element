# Select 组件 需求分析

## 需求分类

### 组件结构

- Select 容器组件
- SelectOptionGroup 组件
- Option 组件

```html
<select v-model="">
  <SelectOptionGroup>
    <option label="option1" value=""></option>
  </SelectOptionGroup>
</select>
```
### HTML结构
```html

```

### 基础用法

表单组件：需要 value

包含选项框和下拉菜单部分，点击选项框后在下方弹出下拉菜单，选中菜单项关闭菜单并更新 Select 组件选项框内的值。

### 扩展功能

- 多选 props
- 自定义选项 HTML slot
- 自定义菜单头部/尾部 slot
- 选项分组 group component
- 自定义标签\* slot
- 自定义标签内容\* slot
- 自定义加载区域 slot
- 配置空值 props

### 带样式的组件

- 尺寸 props
- 禁用状态 boolean props

### 带操作的组件

- 清空 props
- 过滤 props
- 远程搜索 props




## 代码设计

### 接口

```ts
interface SelectProps {
  modelValue: string | number | boolean | array;
  multiple?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  clearable: boolean;
  filterable: boolean;
  remote: boolean;
  emptyValues: array;
}
interface SelectOptionProps {
  label?: string | number;
  value?: string | number;
}
interface SelectOptionGroupProps {
  label?: string;
  disabled?: boolean;
}
interface SelectEmits {
  (e: "change", value: string | nubmer): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "clear"): void;
}
interface SelectInstance {
  focus: (event: FocusEvent) => void;
  blur: (event: FocusEvent) => void;
}
```

### props 参数

### slots 插槽

name=default > option group
name=header
name=footer
name=loading
name=tag
name=label

### emits 事件

### 实例属性和实例方法

## 代码编写

### 创建基础文件

### HTML 结构，类型定义，样式文件引入

### 分析数据结构

### 添加功能

### 添加事件
交互效果：
- esc关闭dropdown
- arrow up&down切换高亮
- enter 选中高亮
### 添加基础样式

### 添加动画

### 补充和遗漏
