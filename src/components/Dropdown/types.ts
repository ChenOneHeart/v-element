import type { TooltipProps } from "../Tooltip/types"
import type { VNode } from "vue"

export type DropdownType = "large" | "default" | "small"

export type DropdownPlacement = 'top' | 'bottom'
export interface DropdownProps extends Omit<TooltipProps, "placement" | "content"> {
  placement?: DropdownPlacement,
  menuOptions?: MenuOption[],
  hideAfterClick?: boolean,
}

export interface MenuOption {
  label: string | VNode;
  key: string | number; // 为什么要有key? 每个选项对应的标识符
  disabled?: boolean,
  divided?: boolean,
}
export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void,
  (e: "select", value: MenuOption): void
}

export interface DropdownInstance {
  show: () => void,
  hide: () => void
}

