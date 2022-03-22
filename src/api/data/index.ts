import { api } from '../config';

export const getbasetabel = (params: any) => {
  return api.post('/data/basetabel', params)
}
