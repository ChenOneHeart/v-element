import { type Options, type Placement } from "@popperjs/core";
export type TriggerType = 'hover' | 'click'
export interface TooltipProps {
  content?: string;
  trigger?: TriggerType;
  placement?: Placement;
  manual?: boolean; //手动触发事件
  popperOptions?: Partial<Options>
  transition?: string,
  showDelay?: number,
  hideDelay?: number,
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void;
}

export interface TooltipInstance {
  show(): void;
  hide(): void;
}