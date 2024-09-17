# Form组件 需求分析
## 需求分类
### 组件结构
```html
<Form>
  <slot />
  <form-item>
    <Input />
  </form-item>
</Form>
```
### 基础用法
数据绑定
表单验证

### 扩展功能

### 带样式的组件
- 类型
- 尺寸
- 禁用状态
- 加载状态
- 长度限制
### 带操作的组件
## 代码设计
### 接口
```ts
interface Props {
  form:object,
  rules:object,

}
interface Emits {}
interface Instance {
  validate:()=> void
  resetFields:()=> void
}
```
### props 参数
### slots 插槽
### emits 事件
### 实例属性和实例方法
## 代码编写
### 创建基础文件
### HTML 结构，类型定义，样式文件引入
### 分析数据结构
### 添加功能
### 添加事件
### 添加基础样式
### 添加动画
### 补充和遗漏