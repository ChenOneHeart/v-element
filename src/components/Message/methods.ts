import { render, h, shallowReactive } from "vue";
import MessageConstructor from "./Message.vue";
import type { createMessageProps, MessageContext } from "./types";
import useZIndex from "@/hooks/useZIndex";
const instances: MessageContext[] = shallowReactive([])
let seed = 1;
export const createMessage = (props: createMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`;
  const container = document.createElement("div");
  const destroy = () => {
    const index = instances.findIndex((item) => item.id === id)
    if (index === -1) return;
    instances.splice(index, 1)
    render(null, container)
  }
  const manualDestory = () => {
    const instance = instances.find(item => item.id === id)
    if (!instance) return;
    instance.vm.exposed!.visible.value = false
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destroy
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstChild!)
  const vm = vnode.component!
  const instance = {
    id,
    props,
    vm,
    vnode,
    destroy: manualDestory,
  }
  instances.push(instance);

  return instance
}


export const getLastInstance = () => {
  return instances.at(-1)
}

export const getIndex = (id: string) => {
  return instances.findIndex(item => item.id === id)
}

export const getLastBottomOffset = (id: string) => {
  const index = instances.findIndex(item => item.id === id)
  if (index <= 0) {
    return 0;
  } else {
    const prev = instances[index - 1]
    return prev.vm.exposed!.bottomOffset.value
  }

}


export const closeAll = () => {
  instances.forEach(instance => {
    instance.destroy()
  })
}