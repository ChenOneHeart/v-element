<template>
  <div class="vc-form">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide } from "vue";
import {
  formContextKey,
  type FormContext,
  type FormEmits,
  type FormInstance,
  type FormItemContext,
  type FormProps,
  type FormValidateFailure,
} from "./type";
import type { ValidateFieldsError } from "async-validator";

defineOptions({
  name: "VcForm",
});
const props = defineProps<FormProps>();
// const Emits = defineEmits<FormEmits>();

const fields: FormItemContext[] = [];
const addField: FormContext["addField"] = field => {
  fields.push(field);
};
const removeField: FormContext["removeField"] = field => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
};

const resetFields = (keys: string[] = []) => {
  const filteredArr =
    keys.length > 0
      ? fields.filter(field => keys.includes(field.prop!))
      : fields;
  for (const field of filteredArr) {
    field.resetField();
  }
};
const clearValidate = (keys: string[] = []) => {
  const filteredArr =
    keys.length > 0
      ? fields.filter(field => keys.includes(field.prop!))
      : fields;
  for (const field of filteredArr) {
    field.clearValidate();
  }
};

const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      };
    }
  }
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
});
provide(formContextKey, {
  ...props,
  addField,
  removeField,
});
</script>
<style lang="scss" scoped></style>
