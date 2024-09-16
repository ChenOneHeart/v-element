<template>
  <div
    :style="style"
    class=""
    :class="{
      [type === 'textarea' ? 'vc-textarea' : 'vc-input']: true,
      [`vc-input--${type}`]: type,
      [`vc-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="vc-input__prepend">
        <slot name="prepend" />
      </div>
      <div
        class="vc-input__wrapper"
        :class="{
          'is-focus': isFocus,
        }"
      >
        <span v-if="$slots.prefix" class="vc-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          v-bind="attrs"
          :placeholder="placeholder"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          v-model="model"
          :disabled="disabled"
          ref="inputRef"
          class="vc-input__inner"
          :type="computedType"
        />
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="vc-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            @click="clear"
            v-if="showClear"
            icon="circle-xmark"
            class="vc-input__clear"
            @mousedown.prevent="NOOP"
          ></Icon>
          <Icon
            @mousedown.prevent="NOOP"
            @click="togglePasswordVisible"
            v-if="showPasswordArea && passwordVisible"
            icon="eye"
            class="vc-input__password"
          ></Icon>
          <Icon
            @mousedown.prevent="NOOP"
            @click="togglePasswordVisible"
            v-if="showPasswordArea && !passwordVisible"
            icon="eye-slash"
            class="vc-input__password"
          ></Icon>
        </span>
      </div>
      <div v-if="$slots.append" class="vc-input__append">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        v-bind="attrs"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
        v-model="model"
        :disabled="disabled"
        ref="inputRef"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        class="vc-textarea__inner"
        :class="{
          'is-focus': isFocus,
          'is-disabled': disabled,
        }"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  type ModelRef,
  type Ref,
  ref,
  useAttrs,
  watch,
  nextTick,
} from "vue";
import type { InputEmits, InputInstance, InputProps } from "./types";
import Icon from "../Icon/Icon.vue";
type TargetElement = HTMLInputElement | HTMLTextAreaElement;
defineOptions({
  name: "VcInput",
  inheritAttrs: false,
});
const attrs = useAttrs();
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  disabled: false,
  autocomplete: "off",
  placeholder: "请输入内容",
});
const computedType = computed(() =>
  props.showPassword
    ? passwordVisible.value
      ? "text"
      : "password"
    : props.type
);
const NOOP = () => {};
const isFocus = ref(false);
const passwordVisible = ref(false);
const model = defineModel("modelValue") as ModelRef<string>;
const emits = defineEmits<InputEmits>();
const inputRef = ref() as Ref<HTMLInputElement>;

const showClear = computed(() => {
  return props.clearable && !props.disabled && !!model.value && isFocus.value;
});
const showPasswordArea = computed(() => {
  return props.showPassword && !props.disabled && !!model.value;
});

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false;
  emits("blur", e);
};
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true;
  emits("focus", e);
};

const handleChange = (e: Event) => {
  emits("change", (e.target as TargetElement).value);
};
const keepFocus = async () => {
  await nextTick();
  inputRef.value.focus();
};
const clear = () => {
  model.value = "";
  console.log(model.value);
  emits("clear");
  emits("input", "");
  emits("change", "");
};
watch(model, val => {
  emits("input", val!);
});

//   if (!inputRef.value) return;
//   inputRef.value.setAttribute("type", nVal ? "password" : props.type);
// });
defineExpose({
  ref: inputRef,
  blur: handleBlur,
  focus: handleFocus,
  input: inputRef,
  clear: clear,
});
</script>

<style lang="scss" scoped></style>
