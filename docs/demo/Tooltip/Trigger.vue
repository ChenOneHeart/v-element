<script setup>
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
</script>
<template>
  <Tooltip trigger="hover" content="鼠标悬浮触发的文字提示" placement="bottom">
    <Button>鼠标悬浮触发</Button>
  </Tooltip>
  <Tooltip trigger="click" content="点击触发的文字提示" placement="bottom">
    <Button>点击触发</Button>
  </Tooltip>
</template>
<style scoped>
.vc-button {
  margin-right: 20px;
}
</style>
