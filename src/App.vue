<template>
  <div>
    <Button @click="tooltipRef?.show()" ref="buttonRef">Default Button</Button>
    <Button @click="tooltipRef?.hide()" plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button>
  </div>
  <div class="default">
    <Button type="primary">Test Button</Button>
    <Button type="success">success Button</Button>
    <Button type="info">info Button</Button>
    <Button loading type="warning">warning Button</Button>
    <Button icon="arrow-up" type="danger">danger Button</Button>
  </div>
  <div class="plain">
    <Button plain type="primary">Test Button</Button>
    <Button plain type="success">success Button</Button>
    <Button plain type="info">info Button</Button>
    <Button plain type="warning">warning Button</Button>
    <Button plain disabled type="danger">danger Button</Button>
  </div>
  <div class="size">
    <Button size="large" type="primary">Test Button</Button>
    <Button size="small" type="primary">Test Button</Button>
  </div>
  <Collapse accordion v-model="openedValue">
    <CollapseItem name="a" title="a">
      <template #title>
        <div>a的标题</div>
      </template>
      <div>a元素的内容</div>
      <div>aaaaa content</div>
    </CollapseItem>
    <CollapseItem name="b" title="b">
      <div>b元素的内容</div>
      <div>this is b context</div>
    </CollapseItem>
    <CollapseItem name="c" title="c" disabled> this is c context </CollapseItem>
    {{ openedValue }}
  </Collapse>
  <Icon icon="arrow-up" type="primary" size="2xl" />
  <div style="margin-left: 200px">
    <Tooltip
      :show-delay="100"
      :hide-delay="100"
      placement="top"
      :trigger="trigger"
      ref="tooltipRef"
      :popper-options="options"
    >
      <img src="./assets/logo.svg" width="200" height="200" />
      <template #content>
        <span>content</span>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import type { ButtonInstance } from "./components/Button/types";
import {
  type TooltipInstance,
  type TriggerType,
} from "./components/Tooltip/types";
import type { Options } from "@popperjs/core";
const trigger = ref<TriggerType>("click");
const buttonRef = ref<ButtonInstance | null>(null);
const tooltipRef = ref<TooltipInstance | null>(null);
const openedValue = ref(["a"]);
const options: Partial<Options> = {
  placement: "right",
  strategy: "fixed",
};
onMounted(() => {
  // if (buttonRef.value) {
  //   console.log(buttonRef.value.ref);
  // }
});
</script>

<style lang="scss" scoped></style>
