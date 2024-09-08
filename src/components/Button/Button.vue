<template>
  <button
    ref="_ref"
    class="vc-button"
    :class="{
      [`vc-button--${type}`]: type,
      [`vc-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon v-if="loading" icon="spinner" spin></Icon>
    <Icon v-if="icon" :icon="icon"></Icon>
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "VKButton",
});
withDefaults(defineProps<ButtonProps>(), {
  // type: "primary",
  nativeType: "button",
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>

<style scoped></style>
