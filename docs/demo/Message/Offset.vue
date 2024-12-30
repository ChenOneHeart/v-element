<script setup>
import { h } from "vue";
import { createMessage } from "@/components/Message/methods.ts";
import Button from "@/components/Button/Button.vue";
const open = () => {
  createMessage({ message: "hello world", duration: 0, type: "success" });
};
const open50 = () => {
  createMessage({ message: "hello world", duration: 0, type: "success", offset: 50 });
};
const open100 = () => {
  createMessage({ message: "hello world", duration: 0, type: "success", offset: 100 });
};
</script>
<template>
  <Button @click="open">默认间距</Button>
  <Button @click="open50">间距 50px</Button>
  <Button @click="open100">间距 100px</Button>
</template>
