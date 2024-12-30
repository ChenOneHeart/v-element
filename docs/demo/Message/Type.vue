<script setup>
import { createMessage } from "@/components/Message/methods.ts";
import Button from "@/components/Button/Button.vue";
const openInfo = () => {
  createMessage({ message: "Info 类型的弹框", duration: 0, type: "info" });
};
const openSuccess = () => {
  createMessage({ message: "success 类型的弹框", duration: 0, type: "success" });
};
const openWarning = () => {
  createMessage({ message: "warning 类型的弹框", duration: 0, type: "warning" });
};
const openDanger = () => {
  createMessage({ message: "Danger 类型的弹框", duration: 0, type: "danger" });
};
</script>
<template>
  <Button @click="openInfo">info 类型</Button>
  <Button @click="openSuccess">success 类型</Button>
  <Button @click="openWarning">warning 类型</Button>
  <Button @click="openDanger">danger 类型</Button>
</template>
