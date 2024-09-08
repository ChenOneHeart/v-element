import { computed, ref } from "vue"

const zIndex = ref(0)
const useZIndex = (initialValue: number = 2000) => {
  const initialZIndex = ref(initialValue)
  const currentZIndex = computed(() => zIndex.value + initialValue)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }
  return {
    currentZIndex,
    initialZIndex,
    nextZIndex
  }
}

export default useZIndex