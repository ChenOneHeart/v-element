<template>
  <div v-on="outerEvents" ref="popperContainerNode" class="vc-tooltip">
    <div ref="triggerNode" v-on="events" class="vc-tooltip__trigger">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="vc-tooltip__popper">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import onClickOutside from "./onClickOutside";
import { computed, onUnmounted, ref, watch } from "vue";
import {
  type TooltipProps,
  type TooltipEmits,
  type TooltipInstance,
} from "./types";
import { createPopper, type Instance } from "@popperjs/core";
import { debounce } from "lodash-es";
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: "click",
  placement: "bottom",
  transition: "fade",
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const events: Record<string, any> = ref({});
const outerEvents: Record<string, any> = ref({});
const popperContainerNode = ref<HTMLElement>();
let popperInstance: Instance;
const openTimes = ref(0),
  closeTimes = ref(0);
onClickOutside(popperContainerNode, () => {
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    isOpen.value = false;
  }
  if (isOpen.value) {
    emits("click-outside", true);
  }
});
const togglePopper = (e: Event) => {
  // console.log(e.target,popperNode.value);
  // 当前点击的元素是否是popperNode
  isOpen.value = !isOpen.value;
  emits("visible-change", isOpen.value);
};
const open = () => {
  isOpen.value = true;
  emits("visible-change", isOpen.value);
};

const close = () => {
  openTimes.value++;
  isOpen.value = false;
  emits("visible-change", isOpen.value);
};
const openDebounce = debounce(open, props.showDelay);
const closeDebounce = debounce(close, props.hideDelay);
const openFinal = () => {
  closeDebounce.cancel();
  openDebounce();
};
const closeFinal = () => {
  openDebounce.cancel();
  closeDebounce();
};
const attachEvent = () => {
  if (props.trigger === "hover") {
    events.value["mouseenter"] = openFinal;
    outerEvents.value["mouseleave"] = closeFinal;
  } else if (props.trigger === "click") {
    events.value["click"] = togglePopper;
  }
};
if (!props.manual) {
  attachEvent();
}
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions,
  };
});
console.log(popperOptions.value.placement);
// 为什么onMountedplacement不生效
watch(
  () => props.manual,
  isManual => {
    if (isManual) {
      events.value = {};
      outerEvents.value = {};
      attachEvent();
    }
  }
);
watch(
  () => props.trigger,
  (nVal, oVal) => {
    if (nVal !== oVal) {
      events.value = {};
      outerEvents.value = {};
      attachEvent();
    }
  }
);
watch(
  isOpen,
  newValue => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        );
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: "post" }
);
onUnmounted(() => {
  if (popperInstance) {
    popperInstance?.destroy();
  }
});

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});
</script>

<style lang="scss" scoped></style>
