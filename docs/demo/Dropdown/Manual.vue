<script setup>
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
import { h, onMounted, ref } from "vue";
const options1 = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
const dropdownRef = ref("dropdownRef");
const open = () => {
  console.log(dropdownRef.value);
  dropdownRef.value.show();
};
const hide = () => {
  dropdownRef.value.hide();
};
onMounted(() => {});
</script>
<template>
  <div class="dropdown-list">
    <Button @click="open">打开 dropdown</Button>
    <Button @click="hide">关闭 dropdown</Button>
    <Dropdown ref="dropdownRef" trigger="hover" manual :menu-options="options1" placement="bottom">
      <Button> dropdown </Button>
    </Dropdown>
  </div>
</template>
<style>
.dropdown-list {
  display: flex;
  gap: 1rem;
}
</style>
