import type { ComponentInternalInstance, VNode } from "vue";
import type { ButtonType } from "../Button/types";

export interface MessageProps {
  message?: string | VNode,
  type?: ButtonType,
  duration?: number,
  showClose?: boolean,
  onDestory: () => void,
  offset?: number,
  id: string,
  zIndex: number,
  transition?: string

}
export interface MessageContext {
  id: string,
  vnode: VNode,
  vm: ComponentInternalInstance,
  props: createMessageProps,
  destroy: () => void
}

export type createMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>
export interface MessageEmits {
  (e: 'close'): void
}
