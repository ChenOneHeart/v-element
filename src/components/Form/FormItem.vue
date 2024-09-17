<template>
  <div
    class="vc-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="vc-form-item__label" for="">{{ label }}</label>
    <div class="vc-form-item__content">
      <slot :validate="validate" />
      <div
        v-if="validateStatus.state === 'error'"
        class="vc-form-item__error-msg"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
} from "vue";
import {
  formContextKey,
  formItemContextKey,
  type FormContext,
  type FormItemContext,
  type FormItemEmits,
  type FormItemInstance,
  type FormItemProps,
  type FormValidateFailure,
  type ValidateStatusProp,
} from "./type";
import { isNil } from "lodash-es";
import Schema from "async-validator";

defineOptions({
  name: "VcFormItem",
});
const props = defineProps<FormItemProps>();
// const emits = defineEmits<FormItemEmits>();

const formContext = inject(formContextKey) as FormContext;
const validateStatus: ValidateStatusProp = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});
let initialValue: any = null;
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});
const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});

const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((rule: any) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};
const clearValidate = () => {
  validateStatus.state = "init";
  validateStatus.loading = false;
  validateStatus.errorMsg = "";
};
const resetField = () => {
  clearValidate();
  const model = formContext.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
};
const isRequired = computed(() => {
  console.log(itemRules.value);
  return itemRules.value.some((rule: any) => rule.required);
});
const validate = async (trigger?: string) => {
  const modelName = props.prop;
  const triggeredRules = getTriggerRules(trigger);
  if (triggeredRules.length === 0) {
    return true;
  }
  if (modelName) {
    validateStatus.loading = true;
    const descriptor = {
      [modelName]: triggeredRules,
    };
    const validator = new Schema(descriptor);
    return validator
      .validate({
        [modelName]: innerValue.value,
      })
      .then(res => {
        validateStatus.state = "success";
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errorMsg =
          errors && errors.length > 0 ? errors[0].message || "" : "";
        return Promise.reject(e);
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};
const context: FormItemContext = {
  prop: props.prop,
  validate,
  clearValidate,
  resetField,
};
onMounted(() => {
  initialValue = innerValue.value;
  if (props.prop) {
    formContext.addField(context);
  }
});

onUnmounted(() => {
  if (props.prop) {
    formContext.removeField(context);
  }
});
provide(formItemContextKey, context);
defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  clearValidate,
  resetField,
});
</script>
<style lang="scss" scoped></style>
