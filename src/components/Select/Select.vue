<template>
  <div
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
    @click="toogleDropdown"
    class="vc-select"
    :class="{
      [`vc-select--${size}`]: size,
      'is-disabled': disabled,
    }"
  >
    <Tooltip
      ref="tooltipRef"
      :popper-options="popperOptions"
      placement="bottom-start"
      @click-outside="controlDropdown(false)"
      manual
    >
      <Input
        @keydown="handleKeydown"
        @input="debounceOnFilter"
        :readonly="!filterable || !isDropdownShow"
        @click="handleInputClick"
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filterPlaceHolder"
      >
        <template #suffix>
          <Icon
            @click="onClear"
            @mousedown.prevent="NOOP"
            icon="circle-xmark"
            v-if="showClearIcon"
            class="vc-input__clear"
          ></Icon>
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{
              'is-active': isDropdownShow,
            }"
          ></Icon>
        </template>
      </Input>
      <template #content>
        <div class="vc-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin></Icon>
        </div>
        <div
          class="vc-select__nodata"
          v-else-if="filterable && filteredOptions.length === 0"
        >
          暂无数据
        </div>
        <ul v-else class="vc-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              @mousedown.prevent="NOOP"
              @click.stop="itemSelect(item)"
              class="vc-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectOption?.value === item.value,
                'is-highlight': states.highlitghtIndex === index,
              }"
              :id="`select-item-${item.value}`"
            >
              <RenderVnode
                :v-node="renderLabel ? renderLabel(item) : item.label"
              ></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, type Ref } from "vue";
import type {
  SelectEmits,
  SelectInstance,
  SelectOption,
  SelectProps,
  SelectState,
  SelectValueType,
} from "./type";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
import Icon from "../Icon/Icon.vue";
import RenderVnode from "../Common/RenderVnode";
import { debounce, isFunction } from "lodash-es";

defineOptions({
  name: "VcSelct",
});
const model = defineModel<SelectValueType>({ required: true });
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const emits = defineEmits<SelectEmits>();
const tooltipRef = ref<TooltipInstance>();
const inputRef = ref() as Ref<InputInstance>;
const findOption = (value: SelectValueType) => {
  const option = props.options.find(item => item.value === value);
  return option || null;
};
const timeout = computed(() => (props.remote ? 300 : 0));

const initialOption = findOption(model.value);
model.value = initialOption ? initialOption.value : "";

const states = reactive<SelectState>({
  inputValue: model.value,
  selectOption: initialOption, // 选中的选项
  mouseHover: false, // 是否在悬浮状态
  loading: false,
  highlitghtIndex: -1,
});
states.inputValue = initialOption ? initialOption.label : "";
const isDropdownShow = ref(false);

const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      effect: ({ state }: { state: any }) => {
        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
      },
    },
  ],
};
// 缓存原始数据
const filteredOptions = ref(props.options);
watch(
  () => props.options,
  nOptions => {
    filteredOptions.value = nOptions;
  }
);
// 根据输入更改缓存数据
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (error) {
      console.log(error);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter(option =>
      option.label.includes(searchValue)
    );
  }
  states.highlitghtIndex = -1;
};
const onFilter = () => {
  generateFilterOptions(states.inputValue);
};
const debounceOnFilter = debounce(onFilter, timeout.value);
const filterPlaceHolder = computed(() => {
  return props.filterable && states.selectOption && isDropdownShow.value
    ? states.selectOption.label
    : props.placeholder;
});

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (
          states.highlitghtIndex > -1 &&
          filteredOptions.value[states.highlitghtIndex]
        ) {
          itemSelect(filteredOptions.value[states.highlitghtIndex]);
        } else {
          controlDropdown(false);
        }
      }

      break;
    case "Escape":
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (states.highlitghtIndex === -1) {
          states.highlitghtIndex = filteredOptions.value.length - 1;
        } else {
          states.highlitghtIndex--;
        }
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (states.highlitghtIndex === filteredOptions.value.length - 1) {
          states.highlitghtIndex = 0;
        } else {
          states.highlitghtIndex++;
        }
      }
      break;
    default:
      break;
  }
};

const showClearIcon = computed(() => {
  // hover上去
  // clearable属性为true
  // 必须要有过选项
  // input不为空
  return (
    states.mouseHover &&
    props.clearable &&
    states.selectOption &&
    model.value.trim() !== ""
  );
});
const onClear = () => {
  states.selectOption = null;
  model.value = "";
  states.inputValue = "";
  emits("clear");
  emits("change", "");
};
const NOOP = () => {};
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter模式
    // 之前选择过值
    if (props.filterable && states.selectOption) {
      model.value = "";
    }
    if (props.filterable) {
      generateFilterOptions(states.inputValue);
    }
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
    if (props.filterable) {
      model.value = states.selectOption ? states.selectOption.value : "";
    }
    states.highlitghtIndex = -1;
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};

const toogleDropdown = () => {
  if (props.disabled) return;
  controlDropdown(!isDropdownShow.value);
};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  model.value = e.value;
  states.selectOption = e;
  emits("change", e.value);
  controlDropdown(false);
  inputRef.value.ref.focus();
};
const handleInputClick = () => {
  tooltipRef.value!.show();
};

defineExpose<SelectInstance>({
  focus,
  blur,
});
</script>

<style lang="scss" scoped></style>
