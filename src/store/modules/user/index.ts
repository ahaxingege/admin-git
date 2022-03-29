import * as user from '@/api/login'
import { initRouter } from '@/utils/common'
interface Shape {
  userName: string,
  password: string
}
interface metaModel {
  title: string | null
}
interface routeModel {
  path: string,
  name: string,
  metaModel: metaModel | null,
  componenturl: string
  redirect: string | null,
}

export interface routes {
  path: string,
  name: string,
  componenturl: string
  redirect: string | null,
  children: Array<routeModel>
}
export interface State {
  userInfo: Shape,
  token: string,
  routerInfo: Array<routes>
}
const state: State = {
  userInfo: {
    userName: '',
    password: ''
  },
  token: '',
  routerInfo: []

}
const mutations: Record<string, unknown> = {
  SET_USERINFON: (state: any, userInfo: State) => {
    state.userInfo = userInfo
  },
  SET_TOKEN: (state: State, token: string) => {
    state.token = token
  },
  SET_ROUTES: (state: State, routerInfo: Array<routes>) => {
    state.routerInfo = routerInfo
  }
}

const actions = {
  setRoutes({ commit }: any, routerInfo: Array<routes>) {
    return new Promise((resolve: any) => {
      commit('SET_ROUTES', routerInfo)
      resolve(routerInfo)
    })
  },
  addRoutes({ commit, state }: any, routerInfo: Array<routes>) {
    return new Promise((resolve: any) => {
      routerInfo.forEach((ele: any) => {
        initRouter(ele)
      });
      resolve(routerInfo)
    })
  },
  // 用户登录
  login({ commit }: any, userInfo: Record<string, unknown>) {
    return new Promise((resolve: any, reject: any) => {
      user.login(userInfo)
        .then((response: any) => {
          console.log(response)
          // console.log(commit('SET_TOKENNAME'), response)
          commit('SET_USERINFON', userInfo)
          commit('SET_TOKEN', response.data.sessionId)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout({ commit }: any, _userInfo: Record<string, unknown>) {
    return new Promise((resolve: any, reject: any) => {
      user.logout()
        .then((response: any) => {
          console.log(response)
          commit('SET_USERINFON', {
            userName: '',
            password: ''
          })
          commit('SET_TOKEN', '')
          commit('SET_ROUTES', [])
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
