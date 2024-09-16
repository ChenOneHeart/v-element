import type { Ref } from "vue"
type InputType = "text" | "textarea" | "password" | "button" | "number" | "radio"
export interface InputProps {
  style?: any;
  modelValue: string,
  type?: InputType;
  size?: ComponentSize;
  disabled?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  maxLength?: string;
  minLength?: string;
  showWordLimit?: boolean;
  showPassword?: boolean;
  clearable?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
  parser?: (value: string) => string;
}
export interface InputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
  (e: "input", value: string): void;
  (e: "change", value: string): void;
  (e: "clear"): void;
}
export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement;
  blur: (e: FocusEvent) => void;
  focus: (e: FocusEvent) => void;
  input: Ref<HTMLInputElement>;
  clear: () => void;
}