import type { InjectionKey } from "vue"
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator"
export interface FormProps {
  model: Record<string, any>;
  rules: Record<string, any>;
}

export interface FormContext extends FormProps {
  addField: (filed: FormItemContext) => void;
  removeField: (filed: FormItemContext) => void;
}
export interface FormItemContext {
  prop?: string;
  validate: (trigger?: string) => Promise<any>;
  resetField: () => void;
  clearValidate: () => void;
}

export const formContextKey: InjectionKey<FormContext> = Symbol("formContextKey")
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContextKey")
export interface FormItemProps {
  label?: string;
  prop?: string;
}

export type FormRules = Record<string, FormItemRules[]>
export interface FormItemRules extends RuleItem {
  trigger?: string;
}
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError
}
export interface FormEmits {

}
export interface FormItemEmits {

}
export interface ValidateStatusProp {
  state: "init" | 'success' | 'error';
  errorMsg: string;
  loading: boolean;
}
export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void;
  clearValidate: (props?: string[]) => void;
}
export interface FormItemInstance {
  validateStatus: ValidateStatusProp;
  validate: () => Promise<any>;
  resetField: () => void;
  clearValidate: () => void;
}