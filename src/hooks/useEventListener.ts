
import { isRef, onBeforeUnmount, onMounted, type Ref, watch, unref } from "vue"

const useEventListener = (
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any) => {
  if (isRef(target)) {
    watch(target, (nVal, oVal) => {
      if (nVal) {
        target.value!.addEventListener(event, handler)
      }
    })
  } else {
    onMounted(() => target.addEventListener(event, handler))

  }
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

export default useEventListener