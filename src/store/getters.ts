const getters = {
  token: (state: any) => state.user.token,
  isCollapse: (state: any) => state.layoutSetting.isCollapse
}
export default getters;
