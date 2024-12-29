<script setup>
import { ref } from "vue";
import Collapse from "@/components/Collapse/Collapse.vue";
const activeNames = ref("");
const handleChange = () => {};
</script>
<template>
  <Collapse accordion :modelValue="activeNames" @change="handleChange">
    <CollapseItem title="according A" name="a"> according A content</CollapseItem>
    <CollapseItem title="according B" name="b"> according B content</CollapseItem>
    <CollapseItem disabled title="according C" name="c"> according C content</CollapseItem>
  </Collapse>
  <span>{{ activeNames }}</span>
</template>
