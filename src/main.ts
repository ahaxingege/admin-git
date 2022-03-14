import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import { myMessage, guid, mapFun } from '@/utils/common'
import * as ElIcons from '@element-plus/icons-vue'
import '@/style/reset.css'
import 'element-plus/dist/index.css'
import { mockXHR } from '@/mock/index';
import * as user from '@/api/login'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue')
if (process.env.NODE_ENV === 'development') {
  // 判断是否为mock模式
  mockXHR();
}
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
// const app = createApp(App)
let registerRouteFresh = true;
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.meta && to.meta.title) {
    document.title = (to.meta.title) as string;
  }
  const tokenData: any = await user.isLogin()
  const istoken = store.getters.token
  const { sessionId } = tokenData.data
  if (sessionId === istoken) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    NProgress.done()
  } else {
    if (to.path !== '/login') {
      myMessage.error('登陆超时，请重新登录！！')
      next({ path: '/login', query: to.query })
    } else {
      next()
    }
    NProgress.done()
  }
  const result: any = await user.getRoutes()
  const { routerarr } = result.data;
  const menueRouters = JSON.parse(JSON.stringify(routerarr))
  const menus = [...router.options.routes, ...menueRouters]
  store.dispatch('user/setRoutes', menus)
  if (registerRouteFresh) {
    const accessRoutes = await store.dispatch('user/addRoutes', routerarr)
    mapFun(accessRoutes)
    router.addRoute(
      {
        path: '/:catchAll(.*)',
        name: '404',
        meta: {
          hidden: true,
          title: '地址错误'
        },
        redirect: '/404'
      }
    )
    next({ ...to, replace: true })
    registerRouteFresh = false
  } else {
    next()
  }
})
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
  setTimeout(() => {
    sessionStorage.setItem('sessionId', guid());
  }, 36000000)
})
const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
app.use(ElementPlus).use(store).use(router).mount('#app')
