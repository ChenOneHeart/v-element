<script setup>
import { createMessage } from "@/components/Message/methods.ts";
import Button from "@/components/Button/Button.vue";
const open = () => {
  createMessage({ message: "默认持续3000ms", type: "info" });
};
const open0 = () => {
  createMessage({ message: "弹框一直保留", duration: 0, type: "success", showClose: true });
};
const open1000 = () => {
  createMessage({ message: "持续 1000ms", duration: 1000, type: "warning" });
};
const open2000 = () => {
  createMessage({ message: "持续 2000ms", duration: 2000, type: "danger" });
};
</script>
<template>
  <Button @click="open1000">持续 1000ms</Button>
  <Button @click="open2000">持续 2000ms</Button>
  <Button @click="open">默认状态</Button>
  <Button @click="open0">不关闭按钮</Button>
</template>
