import axios, { type AxiosRequestConfig } from "axios";
import cookie from "js-cookie";
import { authOptions, getAuthSession } from "@/utils/auth";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
});

type Fn = (data: FcResponse<any>) => unknown;

interface IAnyObj {
  [index: string]: unknown;
}

interface FcResponse<T> {
  errno: number;
  message: string;
  data: T;
}

// 请求拦截器
apiClient.interceptors.request.use(
  async(config) => {
    // 客户端才修改请求头
    if (typeof window !== "undefined") {
      const session = await getAuthSession();
      session&&(config.headers.authorization = session.accessToken);
    }
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);

    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {}); // 返回一个空 Promise 取消请求不触发 catch
    }
    Promise.reject(error.response);

    return Promise.reject({
      ...error.response?.data,
      status: error.response?.status,
    });
  }
);

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  config: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    apiClient
      .get(url, { params, ...config })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve([null, res as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export const Delete = <T>(
  url: string,
  config: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    apiClient
      .delete(url, { ...config })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve([null, res as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export const Post = <T>(
  url: string,
  data: IAnyObj,
  config: IAnyObj = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    apiClient
      .post(url, data, { ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};

export const Patch = <T>(
  url: string,
  data: IAnyObj,
  config: IAnyObj = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    apiClient
      .patch(url, data, { ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};

export default apiClient;
