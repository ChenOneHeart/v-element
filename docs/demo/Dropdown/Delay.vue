<script setup>
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import Button from "@/components/Button/Button.vue";
import { h } from "vue";
const options = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
</script>
<template>
  <div class="dropdown-list">
    <Dropdown trigger="hover" :show-delay="0" :menu-options="options" placement="bottom">
      <Button> 无延迟 </Button>
    </Dropdown>
    <Dropdown trigger="hover" :show-delay="1000" :menu-options="options" placement="bottom">
      <Button> 展开延迟 1000ms </Button>
    </Dropdown>
    <Dropdown trigger="hover" :show-delay="2000" :menu-options="options" placement="bottom">
      <Button> 展开延迟 2000ms </Button>
    </Dropdown>
    <Dropdown trigger="hover" :hide-delay="1000" :menu-options="options" placement="bottom">
      <Button> 关闭延迟 1000ms </Button>
    </Dropdown>
    <Dropdown trigger="hover" :hide-delay="2000" :menu-options="options" placement="bottom">
      <Button> 关闭延迟 2000ms </Button>
    </Dropdown>
  </div>
</template>
<style>
.dropdown-list {
  display: flex;
  gap: 1rem;
}
</style>
