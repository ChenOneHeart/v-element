import type { Ref, InjectionKey } from "vue"

export type NameType = string | number

export interface CollpaseProps {
  modelValue: NameType[],
  // activeName?: NameType[] | string,
  accordion?: boolean,
  change?: (activeName: NameType[]) => void
}

export interface CollapseItemProps {
  title?: string,
  name: NameType,
  disabled?: boolean
}


// 
export interface CollapseContext {
  activeNames: Ref<NameType[]>,
  handleItemClick: (name: NameType) => void
}


export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void,
  (e: 'change', value: NameType[]): void,

}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol("collapseContextKey")