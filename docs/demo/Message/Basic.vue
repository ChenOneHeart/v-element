<script setup>
import { h } from "vue";
import { createMessage } from "@/components/Message/methods.ts";
import Button from "@/components/Button/Button.vue";
const open = () => {
  createMessage({ message: "hello world", duration: 0, type: "success" });
};

const openVn = () => {
  createMessage({
    message: h("p", "使用VNode方式生成message")
  });
};
</script>
<template>
  <Button @click="open">message 基础用法</Button>
  <Button @click="openVn">message VNode语法</Button>
</template>
