import { createApp } from 'vue'
import { store, key } from '@/store'
import App from '@/App.vue'
import router from '@/router'
import mitt from 'mitt'
import '@/assets/styles/main.scss'

const app = createApp(App)

app.provide('eventBus', mitt())
app.use(router).use(store, key)
app.mount('body')
