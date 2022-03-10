import * as user from '@/api/login'
// import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
// import store from '@/store'
interface Shape {
  userName: string,
  password: string
}
export interface State {
  userInfo: Shape,
  token: string
}
// initial state
// shape: [{ id, quantity }]

const state: State = {
  userInfo: {
    userName: '',
    password: ''
  },
  token: ''
}
const mutations: Record<string, unknown> = {
  SET_USERINFON: (state: any, userInfo: State) => {
    state.userInfo = userInfo
  },
  SET_TOKEN: (state: State, token: string) => {
    state.token = token
  }
}

const actions = {
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
          console.log(error)
          reject(error)
        })
    })
  },
  logout({ commit }: any, userInfo: Record<string, unknown>) {
    return new Promise((resolve: any, reject: any) => {
      user.logout()
        .then((response: any) => {
          console.log(response)
          commit('SET_USERINFON', {
            userName: '',
            password: ''
          })
          commit('SET_TOKEN', '')
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
