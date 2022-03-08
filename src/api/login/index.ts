import { api } from '../config';

export const login = (params: Record<string, unknown>) => {
  return api.get('/user/info', params)
}
