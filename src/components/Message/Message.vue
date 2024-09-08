<template>
  <Transition
    @after-leave="destroyComponent"
    @enter="updateHeight"
    :name="transition"
  >
    <div
      class="vc-message"
      v-show="visible"
      :class="{
        [`vc-message--${type}`]: type,
        'is-close': showClose,
      }"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      ref="messageRef"
      :style="cssStyle"
      role="alert"
    >
      <div class="vc-message__content">
        <slot><RenderVnode :vNode="message" v-if="message"></RenderVnode></slot>
      </div>
      <div class="vc-message__close" v-if="showClose">
        <Icon @click="() => (visible = false)" icon="xmark"></Icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
import type { MessageProps, MessageEmits } from "./types";
import { getLastBottomOffset } from "./methods";
import { useEventListener } from "@vueuse/core";
defineOptions({
  name: "VCMessage",
});
const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
// 计算偏移高度
const height = ref(0);

const lastOffset = computed(() => getLastBottomOffset(props.id));

const topOffset = computed(() => props.offset + lastOffset.value);

const bottomOffset = computed(() => height.value + topOffset.value);
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  showClose: false,
  transition: "fade-up",
});
const emits = defineEmits<MessageEmits>();
let timer: any;
function startTimer() {
  if (props.duration === 0) {
    return;
  }
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
function clearTimer() {
  clearTimeout(timer);
}
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visible.value = false;
  }
}
useEventListener(document, "keydown", keydown);

onMounted(async () => {
  visible.value = true;
  startTimer();
});

function destroyComponent() {
  props.onDestory();
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}

defineExpose({
  bottomOffset,
  visible,
});
</script>

<style lang="scss" scoped></style>
