import { ElMessage } from 'element-plus'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router';

const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue')

export const myMessage = ElMessage;

function S4(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid(): string {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

export function insertRouters(item: RouteRecordRaw, parentName: string | null): void {
  console.log(item, parentName)
  parentName ? router.addRoute(parentName, item) : router.addRoute(item)
  // console.log(router.getRoutes())
}
export function getItem(name: string): any {
  if (name === 'Layout') {
    return Layout
  } else {
    return require(`@/views/${name}.vue`);
  }
}
export function initRouter(ele: any): any {
  ele.component = getItem(ele.componenturl)
  if (ele.parentName) {
    insertRouters(ele, ele.parentName)
  } else {
    insertRouters(ele, null)
  }
  if (ele.chilren && ele.chilren.length > 0) {
    console.log(ele.chilren)
    ele.chilren.forEach((item: any) => {
      initRouter(item)
    })
  }
}
