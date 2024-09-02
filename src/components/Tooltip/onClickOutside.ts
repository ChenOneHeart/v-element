import { onMounted, onUnmounted, type Ref } from "vue";

/**
 * 
 * @param target 
 * @param callback 
 */
export default function (target: Ref<HTMLElement | undefined>, callback: (e: MouseEvent) => void) {
  const handler = (e: MouseEvent) => {
    // 点击到目标元素外
    if (target.value && e.target) {
      if (!target.value.contains(e.target as HTMLElement)) {
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