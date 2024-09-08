<template>
  <div class="mb-4 flex-wrap">
    <Button ref="buttonRef">Default Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VC</Button>
    <Button disabled>Disabled Button</Button>
  </div>
  <div class="default mb-4">
    <Button type="primary">Test Button</Button>
    <Button type="success">success Button</Button>
    <Button type="info">info Button</Button>
    <Button loading type="warning">warning Button</Button>
    <Button icon="arrow-up" type="danger">danger Button</Button>
  </div>
  <div class="plain mb-4">
    <Button plain type="primary">Test Button</Button>
    <Button plain type="success">success Button</Button>
    <Button plain type="info">info Button</Button>
    <Button plain type="warning">warning Button</Button>
    <Button plain disabled type="danger">danger Button</Button>
  </div>
  <div class="size mb-4">
    <Button size="large" type="primary">Test Button</Button>
    <Button type="primary">Test Button</Button>
    <Button size="small" type="primary">Test Button</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button/Button.vue";
</script>

<style lang="scss" scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>
