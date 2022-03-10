const getters = {
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  isCollapse: (state: any) => state.layoutSetting.isCollapse
}
export default getters;
