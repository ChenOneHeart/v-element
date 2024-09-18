import type { App } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Message, { closeAll as closeMessageAll, createMessage } from "./components/Message";

const components = [
  Button,
  Collapse,
  CollapseItem,
  Message
]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  install,
  Button,
  Collapse,
  CollapseItem,
  Message,
  createMessage,
  closeMessageAll
}
export default install