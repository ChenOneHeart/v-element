<script setup>
import { ref } from "vue";
import Collapse from "@/components/Collapse/Collapse.vue";
import CollapseItem from "@/components/Collapse/CollapseItem.vue";
const activeNames = ref("");
const handleChange = () => {};
</script>
<template>
  <Collapse :modelValue="activeNames" @change="handleChange">
    <CollapseItem title="title A" name="a"> content A </CollapseItem>
    <CollapseItem title="title B" name="b"> content B </CollapseItem>
    <CollapseItem disabled title="title C" name="c"> content C </CollapseItem>
  </Collapse>
  <span>{{ activeNames }}</span>
</template>
