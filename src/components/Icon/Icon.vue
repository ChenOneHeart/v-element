<template>
  <i
    class="vk-icon"
    :class="{ [`vk-icon--${type}`]: type }"
    :style="customStyles"
  >
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from "./type";
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";
defineOptions({
  name: "VKIcon",
});

const props = defineProps<IconProps>();
const filteredProps = computed(() =>omit(props, ["type", "color"]));
const customStyles = computed(() => {
  return props.color ? { color: props.color } : "";
});
</script>

<style lang="scss" scoped></style>
