<template>
  <div class="vc-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :manual="manual"
      :popper-options="popperOptions"
      :show-delay="showDelay"
      :hide-delay="hideDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="vc-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="devided-placeholder"
            ></li>
            <li
              @click="itemClick(item)"
              class="vc-dropdown__item"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              :id="`dropdown-item${item.key}`"
            >
              <RenderVnode :v-node="item.label"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  MenuOption,
} from "./types";
import RenderVnode from "../Common/RenderVnode";
defineOptions({
  name: "VcDropdown",
});
const props = withDefaults(defineProps<DropdownProps>(), {
  placement: "bottom",
  hideAfterClick: true,
});

const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<TooltipInstance>();
const visibleChange = (e: boolean) => {
  emits("visible-change", e);
};

const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return;
  }
  emits("select", e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show,
  hide: () => tooltipRef.value?.hide,
});
</script>

<style lang="scss" scoped></style>
