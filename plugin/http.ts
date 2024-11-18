import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError
} from './tools'

type Fn = (data: FcResponse<any>) => unknown

interface IAnyObj {
  [index: string]: unknown
}

interface FcResponse<T> {
  errno: number
  message: string
  data: T
}

type ICustomAxiosConfig = AxiosRequestConfig & { opName?: string }

const globalStore = gloabl(pinia)

axios.interceptors.request.use((config) => {
  const newConfig = config as ICustomAxiosConfig
  //全局控制接口loading状态
  globalStore.startLoading({ opName: newConfig.opName })
  config = handleChangeRequestHeader(config)
  config = handleConfigureAuth(config)
  return config
})
axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(
  (response) => {
    const { config } = response
    const newConfig = config as ICustomAxiosConfig
    globalStore.finishLoading({ opName: newConfig.opName })
    if (response.status !== 200) return Promise.reject(response.data)
    handleAuthError(response.data.errno)
    handleGeneralError(response.data.errno, response.data.message)
    return response
  },
  (err: AxiosError) => {
    const newConfig = err.config as ICustomAxiosConfig
    globalStore.finishLoading({ opName: newConfig.opName })
    handleNetworkError(err?.response?.status)
    Promise.reject(err.response)
  }
)

export const Get = <T>(
  url: string,
  params: IAnyObj,
  config: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .get(url, { params, ...config })
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Delete = <T>(
  url: string,
  config: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .delete(url, { ...config })
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Post = <T>(
  url: string,
  data: IAnyObj,
  config: IAnyObj = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const Patch = <T>(
  url: string,
  data: IAnyObj,
  config: IAnyObj = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .patch(url, data, { ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
