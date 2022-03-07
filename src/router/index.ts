import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Layout',
    component: Layout,
    meta: {
      hidden: true
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          hidden: true,
          title: <string>'关于'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      }]
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    redirect: '/about',
    meta: {
      title: <string>'关于'
    },
    children: [
      {
        path: '/about',
        name: 'About',
        meta: {
          title: <string>'关于'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }]
  },
  {
    path: '/about1',
    name: 'About1',
    component: Layout,
    redirect: '/about1',
    meta: {
      title: <string>'关于'
    },
    children: [
      {
        path: '/about1',
        name: 'About1',
        meta: {
          title: '关于1'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/components/HelloWorld.vue')
      },
      {
        path: '/about3',
        name: 'About3',
        meta: {
          title: <string>'关于3'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }]
  }, {
    path: '/about2',
    name: 'About2',
    component: Layout,
    redirect: '/about2',
    children: [
      {
        path: '/about2',
        name: 'About2',
        meta: {
          title: <string>'关于2'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }]
  },
  {
    path: '/404',
    name: '404Page',
    meta: {
      hidden: true,
      title: <string>'地址错误'
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/errorPage/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
