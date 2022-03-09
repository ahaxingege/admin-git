import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import '@/style/reset.css'
import 'element-plus/dist/index.css'
import { mockXHR } from '@/mock/index';

if (process.env.NODE_ENV === 'development') {
  // 判断是否为mock模式
  mockXHR();
}
// const app = createApp(App)
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    // const title = (to.meta.title) as string
    document.title = (to.meta.title) as string;
  }
  next()
})
const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
app.use(ElementPlus).use(store).use(router).mount('#app')
