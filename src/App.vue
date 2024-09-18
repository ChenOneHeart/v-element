<template>
  <div class="">
    <vc-form
      style="max-width: 600px"
      ref="formRef"
      :model="model"
      :rules="rules"
    >
      <vc-form-item label="邮箱：" prop="email">
        <vc-input v-model="model.email"></vc-input>
      </vc-form-item>
      <vc-form-item label="密码：" prop="password">
        <vc-input v-model="model.password"></vc-input>
      </vc-form-item>
      <vc-form-item label="test value" prop="confirmPwd">
        <vc-input v-model="model.confirmPwd"></vc-input>
      </vc-form-item>
      <vc-form-item>
        <button @click.prevent="submit">表单验证</button>
        <button @click.prevent="reset">表单验证重置</button>
        <button @click.prevent="clear">表单重置</button>
      </vc-form-item>
    </vc-form>
    {{ $echo('china') }}
    <vc-button >button</vc-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, type Ref } from "vue";
import VcForm from "./components/Form/Form.vue";
import VcFormItem from "./components/Form/FormItem.vue";
import VcInput from "./components/Input/Input.vue";
import type { FormInstance } from "./components/Form/type";
const formRef = ref() as Ref<FormInstance>;
const model = reactive({
  email: "123@qq.com",
  password: "",
  confirmPwd: "",
});
const submit = async () => {
  try {
    await formRef.value!.validate();
    console.log("passed");
  } catch (error) {
    console.log("the error", error);
  }
};
const reset = () => {
  formRef.value.clearValidate();
};
const clear = () => {
  formRef.value.resetFields();
};
const rules = {
  email: [
    {
      required: true,
      type: "email",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      type: "string",
      trigger: "blur",
      min: 3,
      max: 5,
    },
  ],
  confirmPwd: [
    {
      required: true,
      type: "string",
      trigger: "blur",
    },
    {
      validator: (rule: any, value: any) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};
</script>
<style lang="scss" scoped></style>
