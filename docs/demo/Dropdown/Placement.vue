<script setup>
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import Button from "@/components/Button/Button.vue";
import { h } from "vue";
const options1 = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
const options2 = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
const options3 = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
const options4 = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" }
];
</script>
<template>
  <div class="dropdown-list">
    <Dropdown :menu-options="options1" placement="top">
      <Button> top </Button>
    </Dropdown>
    <Dropdown :menu-options="options2" placement="left">
      <Button> left </Button>
    </Dropdown>
    <Dropdown :menu-options="options3" placement="right">
      <Button> right </Button>
    </Dropdown>
    <Dropdown :menu-options="options4" placement="bottom">
      <Button> bottom </Button>
    </Dropdown>
  </div>
</template>
<style>
.dropdown-list {
  display: flex;
  gap: 1rem;
}
</style>
