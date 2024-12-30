# 快速开始

## 安装

```bash
npm install element_library_1
```

在main.js中引入

```js
import { createApp } from "vue";
import App from "./App.vue";
import VcElement from "element_library_1";
import "element_library_1/dist/index.css";

const app = createApp(App);
app.use(VcElement);
app.mount("#app");
```

## 使用

以下是一些组件的常规使用方式。

**Button**

```js
import { Button } from "element_library_1";
```

```html
<div class="mb-4 flex-wrap">
  <button ref="buttonRef">Default Button</button>
  <button plain>Plain Button</button>
  <button round>Round Button</button>
  <button circle>VC</button>
  <button disabled>Disabled Button</button>
</div>
<div class="default mb-4">
  <button type="primary">Test Button</button>
  <button type="success">success Button</button>
  <button type="info">info Button</button>
  <button loading type="warning">warning Button</button>
  <button icon="arrow-up" type="danger">danger Button</button>
</div>
<div class="plain mb-4">
  <button plain type="primary">Test Button</button>
  <button plain type="success">success Button</button>
  <button plain type="info">info Button</button>
  <button plain type="warning">warning Button</button>
  <button plain disabled type="danger">danger Button</button>
</div>
<div class="size mb-4">
  <button size="large" type="primary">Test Button</button>
  <button type="primary">Test Button</button>
  <button size="small" type="primary">Test Button</button>
</div>
```

**Input**

```js
const test = ref("");
```

```html
<input v-model="test" placeholder="基础文本框，请输入" />
```

**Form**

```js
const formRef = ref();
const model = reactive({
  email: "123",
  password: "",
  confirmPwd: ""
});
const rules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [{ type: "string", required: true, trigger: "blur", min: 3, max: 5 }],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (rule, value) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同"
    }
  ]
};

const submit = async () => {
  try {
    await formRef.value.validate();
    console.log("passed!");
  } catch (e) {
    console.log("the error", e);
  }
};
const reset = () => {
  formRef.value.resetFields();
};
```

```html
<form :model="model" :rules="rules" ref="formRef">
  <FormItem label="the email" prop="email">
    <input v-model="model.email" />
  </FormItem>
  <FormItem label="the password" prop="password">
    <input type="password" v-model="model.password" />
  </FormItem>
  <FormItem prop="confirmPwd" label="confirm password">
    <input v-model="model.confirmPwd" type="password" />
  </FormItem>
  <div :style="{textAlign: 'center'}">
    <button type="primary" @click.prevent="submit">Submit</button>
    <button @click.prevent="reset">Reset</button>
  </div>
</form>
```
