<script setup>
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
</script>
<template>
  <Tooltip content="左边的文字提示" placement="left">
    <Button>left 左边</Button>
  </Tooltip>
  <Tooltip content="右边的文字提示" placement="right">
    <Button>right 右边</Button>
  </Tooltip>
  <Tooltip content="上方的文字提示" placement="top">
    <Button>top 上方</Button>
  </Tooltip>
  <Tooltip content="下方的文字提示" placement="bottom">
    <Button>bottom 下方</Button>
  </Tooltip>
</template>
<style scoped>
.vc-button {
  margin-right: 20px;
}
</style>
