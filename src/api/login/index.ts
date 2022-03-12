import { api } from '../config';

export const login = (params: Record<string, unknown>) => {
  return api.post('/user/login', params)
}

export const logout = () => {
  return api.get('/user/logout')
}

export const isLogin = () => {
  return api.get('/user/check')
}
export const getRoutes = () => {
  return api.get('/user/getroutes')
}
