<template>
  <div
    class="vc-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="vc-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <Transition @="transitionEvent" name="slide">
      <div class="vc-collapse-item__wrapper" v-show="isActive">
        <div class="vc-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { collapseContextKey, type CollapseItemProps } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "VcCollapseItem",
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(collapseContextKey);
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  collapseContext?.handleItemClick(props.name);
};

const transitionEvent: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = "0px"; // 高度为0（隐藏状态）
    el.style.overflow = "hidden";
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`; //含内边距的高度
  },
  afterEnter(el) {
    el.style.height = ""; // 高度恢复初始值（height=""为元素正常状态下的value）
    el.style.overflow = "";
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },
  leave(el) {
    // 因为el.style.height的默认值为""所以需要设置一个初始值。
    el.style.height = `${el.scrollHeight}px`;
    el.style.height = "0px";
  },
  //
  afterLeave(el) {
    el.style.height = "";
    el.style.overflow = "";
  },
};
</script>

<style lang="scss" scoped>
.vc-collapse-item__header {
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
