import { inject } from "vue";
import { formContextKey, formItemContextKey } from "./type";

const useFormItem = () => {
  return {
    formContext: inject(formContextKey, undefined),
    formItemContext: inject(formItemContextKey, undefined)
  }
}
export default useFormItem