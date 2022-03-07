import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/style/reset.css'
import 'element-plus/dist/index.css'

// const app = createApp(App)
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
