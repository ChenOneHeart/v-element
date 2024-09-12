<template>
  <div
    class="vc-switch"
    :class="{
      [`vc-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-loading': loading,
      'is-checked': checked,
    }"
  >
    <input
      ref="inputRef"
      class="vc-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div @click="switchValue" class="vc-switch__core">
      <div v-if="activeText || inactiveText" class="vc-switch__inner">
        <span class="is-text">{{ checked ? activeText : inactiveText }}</span>
      </div>
      <div class="vc-switch__action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type {
  SwitchEmits,
  SwitchInstance,
  SwitchProps,
  SwitchValueType,
} from "./type";
defineOptions({
  name: "VcSwitch",
  inheritAttrs: false,
});
const model = defineModel("modelValue");
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const inputRef = ref<HTMLInputElement>();

const focus = () => {};
const checked = computed(() => model.value === props.activeValue);
const switchValue = () => {
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  model.value = newValue;
  emits("change", model.value as SwitchValueType);
};

onMounted(() => {});

defineExpose<SwitchInstance>({
  focus: focus,
});
</script>
