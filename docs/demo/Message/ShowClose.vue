<script setup>
import { h } from "vue";
import { createMessage } from "@/components/Message/methods.ts";
import Button from "@/components/Button/Button.vue";
const open = () => {
  createMessage({ message: "默认无关闭按钮", duration: 0, type: "info" });
};
const openHideClose = () => {
  createMessage({ message: "隐藏关闭按钮", duration: 0, showClose: false, type: "info" });
};
const openShowClose = () => {
  createMessage({ message: "开启关闭按钮", duration: 0, showClose: true, type: "info" });
};
</script>
<template>
  <Button @click="open">默认状态</Button>
  <Button @click="openHideClose">隐藏关闭按钮</Button>
  <Button @click="openShowClose">开启关闭按钮</Button>
</template>
