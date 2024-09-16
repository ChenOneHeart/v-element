import type { VNode } from "vue";

export type SelectValueType = string
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue: SelectValueType;
  multiple?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  clearable?: boolean;
  filterable?: boolean;
  remote?: boolean;
  emptyValues?: EmptyValue[];
  placeholder?: string;
  options?: SelectOption[];
  renderLabel?: RenderLabelFunc;
  filterMethod?: CustomFilterFunc;
  remoteMethod?: CustomRemoteFunc;
}

export interface SelectState {
  inputValue: string;
  selectOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlitghtIndex: number;
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomRemoteFunc = (value: string) => Promise<SelectOption[]>
export interface SelectEmits {
  (e: "change", value: string | number): void;
  (e: "visible-change", value: boolean): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "clear"): void;
}
export interface SelectInstance {
  focus: (event: FocusEvent) => void;
  blur: (event: FocusEvent) => void;
}