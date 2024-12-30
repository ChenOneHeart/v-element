<script setup>
import { ref } from "vue";
import Switch from "@/components/Switch/Switch.vue";
const test = ref(false);
const test2 = ref(false);
const test3 = ref(false);
</script>
<template>
  <div class="switch-size-container">
    <Switch v-model="test" size="large" />
    <Switch v-model="test2" />
    <Switch v-model="test3" size="small" />
  </div>
</template>
<style scoped>
.switch-size-container {
  display: flex;
  align-items: center;
  .vk-switch {
    margin-right: 10px;
  }
}
</style>
