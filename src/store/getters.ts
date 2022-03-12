const getters = {
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  isCollapse: (state: any) => state.layoutSetting.isCollapse,
  routerInfo: (state: any) => state.user.routerInfo
}
export default getters;
