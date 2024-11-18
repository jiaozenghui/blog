import axios, { type AxiosRequestConfig } from 'axios'
import cookie from "js-cookie";



const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 客户端才修改请求头
    if (typeof window !== "undefined") {
      config.headers.authorization = cookie.get("token");
    }
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data)

    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {}); // 返回一个空 Promise 取消请求不触发 catch
    }
    Promise.reject(error.response)

    return Promise.reject({
      ...error.response?.data,
      status: error.response?.status,
    });
  },
);


export default apiClient
