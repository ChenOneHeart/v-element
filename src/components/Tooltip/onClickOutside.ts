import { onMounted, onUnmounted, type Ref } from "vue";

/**
 * 
 * @param elementRef 
 * @param callback 
 */
export default function (elementRef: Ref<HTMLElement | undefined>, callback: (e: MouseEvent) => void) {
  const handler = (e: MouseEvent) => {
    // 点击到目标元素外
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    // 给文档绑定hander事件，从而触发回调函数
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    // 清除事件处理程序
    document.removeEventListener('click', handler)
  })
}