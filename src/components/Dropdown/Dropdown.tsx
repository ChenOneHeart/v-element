import { computed, defineComponent, Fragment, ref, type PropType } from "vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TriggerType } from "../Tooltip/types";
import type { TooltipInstance } from "../Tooltip/types";
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  DropdownPlacement,
  MenuOption,
} from "./types";
import { type Options, type Placement } from "@popperjs/core";
import RenderVnode from "../Common/RenderVnode";
export default defineComponent({
  name: "Vdropdown",
  props: {
    trigger: {
      type: String as PropType<TriggerType>,
      default: "click",
    },
    placement: {
      type: String as PropType<DropdownPlacement>,
      default: "bottom",
    },
    manual: {
      type: Boolean,
      default: false,
    }, //手动触发事件
    transition: {
      type: String,
      default: "fade",
    },
    showDelay: {
      type: Number,
      default: 0,
    },
    hideDelay: {
      type: Number,
      default: 0,
    },
    menuOptions: Array as PropType<MenuOption[]>,
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["visible-change", "select"],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null);
    const itemClick = (e: MenuOption) => {
      if (e.disabled) {
        return;
      }
      emit("select", e);
      if (props.hideAfterClick) {
        tooltipRef.value?.hide();
      }
    };
    const visibleChange = (e: boolean) => {
      emit("visible-change", e);
    };
    const options = computed(() => {
      return props.menuOptions?.map(item => {
        return (
          <Fragment key={item.key}>
            {item.divided ? (
              <li role="separator" class="devided-placeholder"></li>
            ) : (
              ""
            )}
            <li
              onClick={() => itemClick(item)}
              class={{
                "vc-dropdown__item": true,
                "is-disabled": item.disabled,
                "is-divided": item.divided,
              }}
              id={`dropdown-item${item.key}`}
            >
              {item.label}
            </li>
          </Fragment>
        );
      });
    });
    expose({
      show: () => tooltipRef.value?.show,
      hide: () => tooltipRef.value?.hide,
    });
    return () => (
      <div class="vc-dropdown">
        <Tooltip
          onVisible-change={visibleChange}
          ref={tooltipRef}
          trigger={props.trigger}
          placement={props.placement}
          manual={props.manual}
          show-delay={props.showDelay}
          hide-delay={props.hideDelay}
        >
          {{
            default: slots.default,
            content: () => <ul class="vc-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    );
  },
});
