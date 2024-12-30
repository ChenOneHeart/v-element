<script setup>
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
</script>
<template>
  <div class="Tooltip-list">
    <Tooltip trigger="hover" :show-delay="0" content="这是一段延迟触发的文字提示" placement="bottom">
      <Button> 无延迟 </Button>
    </Tooltip>
    <Tooltip trigger="hover" :show-delay="1000" content="展开延迟1000ms" placement="bottom">
      <Button> 展开延迟 1000ms </Button>
    </Tooltip>
    <Tooltip trigger="hover" :show-delay="2000" content="展开延迟2000ms" placement="bottom">
      <Button> 展开延迟 2000ms </Button>
    </Tooltip>
    <Tooltip trigger="hover" :hide-delay="1000" content="关闭延迟1000ms" placement="bottom">
      <Button> 关闭延迟 1000ms </Button>
    </Tooltip>
    <Tooltip trigger="hover" :hide-delay="2000" content="关闭延迟1000ms" placement="bottom">
      <Button> 关闭延迟 2000ms </Button>
    </Tooltip>
  </div>
</template>
