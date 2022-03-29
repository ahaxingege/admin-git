import { ElMessage } from 'element-plus'
import router from '@/router'
const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue')

export const myMessage = ElMessage;

function S4(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid(): string {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

export function mapFun(accessRoutes: any): any {
  for (const iterator of accessRoutes) {
    if (iterator.parentName) {
      router.addRoute(iterator.parentName, iterator)
    } else {
      router.addRoute(iterator)
    }
    if (iterator.children) {
      mapFun(iterator.children)
    }
  }
}

export function initRouter(ele: any): any {
  if (ele.componenturl === 'Layout') {
    ele.component = Layout
  } else {
    ele.component = () => import(/* webpackChunkName: "layurlNameout" */ `@/views/${ele.componenturl}.vue`)
  }
  if (ele.children && ele.children.length > 0) {
    ele.children.forEach((item: any) => {
      initRouter(item)
    })
  }
}
