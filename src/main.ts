import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import { myMessage, guid } from '@/utils/common'
import * as ElIcons from '@element-plus/icons-vue'
import '@/style/reset.css'
import 'element-plus/dist/index.css'
import { mockXHR } from '@/mock/index';
import * as user from '@/api/login'

if (process.env.NODE_ENV === 'development') {
  // 判断是否为mock模式
  mockXHR();
}

// const app = createApp(App)
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = (to.meta.title) as string;
  }
  if (to.path !== '/login') {
    user.isLogin().then((result: any) => {
      const istoken = store.getters.token
      const { sessionId } = result.data
      setTimeout(() => {
        sessionStorage.setItem('sessionId', guid());
      }, 300000)
      if (sessionId !== istoken) {
        if (sessionId) {
          myMessage.error('登录超时，请重新登录')
        } else {
          // myMessage.error('登录超时，请重新登录')
        }
        next({ path: '/login', query: from.query })
        // next()
      } else {
        next()
      }
    })
  } else {
    next()
  }
})
const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
app.use(ElementPlus).use(store).use(router).mount('#app')
