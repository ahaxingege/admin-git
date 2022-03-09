import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus'
Axios.defaults.baseURL = 'http://172.19.20.45:8080/'
Axios.defaults.timeout = 2500;
// 添加拦截器
Axios.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config)
  return config
})
const STATUS_OK = 200;

const api = {
  // get
  async get(url: string, getData: Record<string, unknown> = {}) {
    const params = JSON.parse(JSON.stringify(getData))
    return new Promise((resolve, reject) => {
      Axios.get(url, params).then(
        (response: AxiosResponse) => {
          if (response.data.code === STATUS_OK) {
            ElMessage({
              message: response.data.message,
              type: 'success'
            })
            resolve(response.data)
          } else {
            // alert('请检测下您的网络')
            ElMessage.error(response.data.message)

            reject(response.data)
          }
        },
        (error: any) => {
          // showToast('请检测下您的网络')
          // alert('请检测下您的网络')
          ElMessage.error(error.data.message)
          reject(error)
        }
      )
    })
  },
  // post
  async post(url: string, postData: Record<string, unknown> = {}) {
    const datas = JSON.parse(JSON.stringify(postData))
    return new Promise((resolve, reject) => {
      Axios.post(url, datas).then(
        (response: AxiosResponse) => {
          if (response.data.code === STATUS_OK) {
            ElMessage({
              message: response.data.message,
              type: 'success'
            })
            resolve(response.data)
          } else {
            // alert('请检测下您的网络')
            ElMessage.error(response.data.message)
            reject(response.data)
          }
        },
        (error: any) => {
          // showToast('请检测下您的网络')
          reject(error)
        }
      )
    })
  }
}
export {
  api
}
