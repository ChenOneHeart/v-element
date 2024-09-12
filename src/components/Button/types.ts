// import type { PropType } from "vue"
// import type ComponentSize from ""
export type ButtonType = "primary" | "success" | "info" | "warning" | "danger"

export type NativeType = "button" | "submit" | "reset"

export interface ButtonProps {
  type?: ButtonType,
  size?: ComponentSize,
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  loading?: boolean,
  disabled?: boolean,
  icon?: string,
  nativeType?: NativeType,
  autofocus?: boolean
}

export interface ButtonInstance {
  ref: HTMLButtonElement
}