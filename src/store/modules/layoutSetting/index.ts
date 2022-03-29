interface Layout {
  isCollapse: boolean
}

const state: Layout = {
  isCollapse: false
}
const mutations: Record<string, unknown> = {
  SET_COLLAPSE: (state: Layout, isCollapse: boolean) => {
    state.isCollapse = isCollapse
  }
}

const actions = {
  toogleMenu({ commit }: any, isCollapse: boolean) {
    return new Promise((resolve: any) => {
      commit('SET_COLLAPSE', isCollapse);
      resolve({ message: '' });
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
