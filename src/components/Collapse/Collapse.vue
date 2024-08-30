<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, type Ref, watch } from "vue";
import {
  collapseContextKey,
  type NameType,
  type CollpaseProps,
  type CollapseEmits,
} from "./types";

defineOptions({
  name: "VKCollapse",
});

const props = defineProps<CollpaseProps>();
const emits = defineEmits<CollapseEmits>();

const activeNames = ref<NameType[]>(props.modelValue);
if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one active item");
}

watch(props.modelValue, () => {
  activeNames.value = props.modelValue;
});

const handleItemClick = (item: NameType) => {
  const index = activeNames.value.indexOf(item);
  if (props.accordion) {
    // 开启手风琴模式
    activeNames.value = [activeNames.value[0] === item ? "" : item];
  } else {
    // 未开启手风琴模式
    if (index > -1) {
      // 存在 删除数组中的一项
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(item);
    }
  }

  emits("update:modelValue", activeNames.value);
  emits("change", activeNames.value);
};
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<style lang="scss" scoped></style>
