import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
      title: <string>'登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404Page',
    meta: {
      hidden: true,
      title: <string>'地址错误'
    },
    component: () => import(/* webpackChunkName: "404" */ '@/views/errorPage/404.vue')
  },
  {
    path: '/',
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
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      }]
  },
  {
    path: '/about/about1',
    name: 'About1',
    component: Layout,
    redirect: '/about/about1',
    meta: {
      title: <string>'关于1'
    },
    children: [
      {
        path: '/about/about1',
        name: 'About1',
        meta: {
          title: <string>'关于1'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }]
  },
  {
    path: '/about/about2',
    name: 'About2',
    component: Layout,
    redirect: '/about/about2',
    meta: {
      title: <string>'关于2'
    },
    children: [
      {
        path: '/about/about2',
        name: 'About2',
        meta: {
          title: '关于2'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      {
        path: '/about/about3',
        name: 'About3',
        meta: {
          title: <string>'关于3'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }]
  }, {
    path: '/about/about4',
    name: 'About4',
    component: Layout,
    redirect: '/about/about4',
    meta: {
      title: <string>'关于4'
    },
    children: [
      {
        path: '/about/about4',
        name: 'About4',
        meta: {
          title: <string>'关于4'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }, {
        path: '/about/about5',
        name: 'About5',
        meta: {
          title: <string>'关于5'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }]
  }, {
    path: '/about/about6',
    name: 'About6',
    component: Layout,
    redirect: '/about/about6',
    meta: {
      title: <string>'关于6'
    },
    children: [
      {
        path: '/about/about6',
        name: 'About6',
        meta: {
          title: <string>'关于6'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
      }]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
