<script setup>
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
import { ref } from "vue";

const TooltipRef = ref("TooltipRef");
const open = () => {
  console.log(TooltipRef.value);
  TooltipRef.value.show();
};
const hide = () => {
  TooltipRef.value.hide();
};
</script>
<template>
  <div>
    <Button @click="open">打开 Tooltip</Button>
    <Button @click="hide">关闭 Tooltip</Button>
    <Tooltip ref="TooltipRef" trigger="hover" content="这是一段文字提示" manual placement="bottom">
      <Button> Tooltip </Button>
    </Tooltip>
  </div>
</template>
