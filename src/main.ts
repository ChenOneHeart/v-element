import "./styles/index.css"
import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import testPlugin from "./test.plugin"
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add()
const app = createApp(App)
app.use(testPlugin)
app.
  mount('#app')
