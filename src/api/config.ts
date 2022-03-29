import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus'
Axios.defaults.baseURL = 'http://172.19.20.45:8080/'
const STATUS_ERROR = 0;

Axios.defaults.timeout = 2500;
// 添加拦截器
Axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

export const api = {
  async get(url: string, getData: Record<string, unknown> = {}) {
    const params = JSON.parse(JSON.stringify(getData))
    return new Promise((resolve, reject) => {
      Axios.get(url, params).then(
        (response: AxiosResponse) => {
          if (response.data.code !== STATUS_ERROR) {
            response.data.message && ElMessage({
              message: response.data.message,
              type: 'success'
            })
            resolve(response.data)
          } else {
            ElMessage.error(response.data.message)
            reject(response.data)
          }
        },
        (error: any) => {
          ElMessage.error(error.data.message)
          reject(error)
        }
      )
    })
  },
  async post(url: string, postData: Record<string, unknown> = {}) {
    const datas = JSON.parse(JSON.stringify(postData))
    return new Promise((resolve, reject) => {
      Axios.post(url, datas).then(
        (response: AxiosResponse) => {
          if (response.data.code !== STATUS_ERROR) {
            response.data.message && ElMessage({
              message: response.data.message,
              type: 'success'
            })
            resolve(response.data)
          } else {
            ElMessage.error(response.data.message)
            reject(response.data)
          }
        },
        (error: any) => {
          reject(error)
        }
      )
    })
  }
}
