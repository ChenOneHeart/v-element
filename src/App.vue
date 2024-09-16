<template>
  <Input v-model="inputValue" />
  <Test></Test>

  <Select
    @change="handleSelectChange"
    style="width: 300px"
    clearable
    placeholder="请输入你的文字"
    :options="selectOptions2"
    v-model="selectValue2"
  >
  </Select>
  <Select
    @change="handleSelectChange"
    filterable
    style="width: 300px"
    clearable
    remote
    :remote-method="getOptions"
    :options="selectOptions"
    v-model="selectValue"
  >
  </Select>
  <div style="height: 2000px"></div>
</template>

<script setup lang="ts">
import VcSwitch from "./components/Switch/Switch.vue";
import { onMounted, ref, h, watch, handleError } from "vue";
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
import VcDropdown from "./components/Dropdown/Dropdown.tsx";
import type { MenuOption } from "./components/Dropdown/types";
import { createMessage } from "./components/Message/methods.ts";
import Input from "./components/Input/Input.vue";
import Select from "./components/Select/Select.vue";
import type { SelectOption } from "./components/Select/type.ts";
import Test from "./components/Common/Test.vue";
const switchValue = ref("123");
const inputValue = ref("");
const selectValue2 = ref("");
const textAreaValue = ref("");
const labelRenderFun = (option: SelectOption) => {
  return h("div", { className: "my-render-label" }, [
    h("span", "你好"),
    h("span", option.label),
  ]);
};
const getOptions = (searchValue: string) => {
  return new Promise<SelectOption[]>((resolve, reject) => {
    setTimeout(() => {
      let option = selectOptions.filter(option =>
        option.label.includes(searchValue)
      );
      resolve(option);
    }, 1000);
  });
};

let selectOptions = [
  {
    label: "text1",
    value: "1",
  },
  {
    label: "template",
    value: "12",
  },
  {
    label: "memory2",
    value: "2",
    disabled: true,
  },
  {
    label: "handler3",
    value: "3",
  },
];
const selectOptions2 = [
  {
    label: "baidu",
    value: "a",
  },
  {
    label: "tencent",
    value: "b",
  },
  {
    label: "alibaba",
    value: "c",
  },
];
const selectValue = ref("1");
const trigger = ref<TriggerType>("click");
const buttonRef = ref<ButtonInstance | null>(null);
const tooltipRef = ref<TooltipInstance | null>(null);
const openedValue = ref(["a"]);
const options: Partial<Options> = {
  placement: "right",
  strategy: "fixed",
};
const handleSelectChange = e => {
  console.log(e);
};
const menuOptions = ref<MenuOption[]>([
  {
    key: "1",
    // label: "123",
    label: h("div", "one node"),
  },
  {
    key: "2",
    label: "disabled",
    disabled: true,
  },
  {
    key: "3",
    label: "last node",
    divided: true,
  },
]);
onMounted(() => {});
</script>

<style lang="scss" scoped></style>
