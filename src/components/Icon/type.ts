import type { FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";
import type { ButtonType } from "../Button/types"
export interface IconProps extends FontAwesomeIconProps {
  type?: ButtonType,
  color?: string,
}