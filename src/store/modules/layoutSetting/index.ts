import * as user from '@/api/login'
// import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
// import store from '@/store'

interface Layout {
  isCollapse: boolean
}
// initial state
// shape: [{ id, quantity }]

const state: Layout = {
  isCollapse: false
}
const mutations: Record<string, unknown> = {
  SET_COLLAPSE: (state: Layout, isCollapse: boolean) => {
    state.isCollapse = isCollapse
  }
}

const actions = {
  // 用户登录
  login({ commit }: any, isCollapse: boolean) {
    return new Promise((resolve: any, reject: any) => {
      commit('SET_COLLAPSE', isCollapse);
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
