<script setup>
import { reactive, h, ref } from "vue";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
const options = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
const trigger = ref("click");
</script>
<template>
  <Dropdown placement="bottom" :menu-options="options">
    <a herf="#" style="text-decoration: none">下拉菜单</a>
  </Dropdown>
</template>
<style>
.vp-doc ul {
  margin: 0;
  padding: 5px 0;
  list-style: none;
}
</style>
