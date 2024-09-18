<template>
  <div class="vc-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import {
  collapseContextKey,
  type NameType,
  type CollpaseProps,
  type CollapseEmits,
} from "./types";

defineOptions({
  name: "VcCollapse",
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
  let _activeNames = [...activeNames.value];

  if (props.accordion) {
    // 开启手风琴模式
    _activeNames = [activeNames.value[0] === item ? "" : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      // 存在 删除数组中的一项
      _activeNames.splice(index, 1);
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item);
    }
  }
  activeNames.value = _activeNames;
  emits("update:modelValue", activeNames.value);
  emits("change", activeNames.value);
};
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<style lang="scss" scoped></style>
