import { type VNode } from "vue";
export type SwitchValueType = boolean | string | number;
export interface SwitchProps {
  modelValue: SwitchValueType;
  name?: string;
  id?: string;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeIcon?: VNode;
  inactiveIcon?: VNode;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  activeActionIcon?: VNode;
  inactiveActionIcon?: VNode;
}
export interface SwitchEmits {
  (e: "change", value: boolean | string | number): void;
}
export interface SwitchInstance {
  focus: () => void;
}