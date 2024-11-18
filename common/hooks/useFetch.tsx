"use client";

import { useEffect, useRef, useState } from "react";
import type { DependencyList, Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast"

type FetchResult<T, J> = {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  error: AxiosError<T> | null;
  isLoading: boolean;
  refetch: (params?: J) => void;
};

interface optionType {
  /** 是否手动请求*/
  manual?: true;
  /** 依赖数组，触发自动更新*/
  deps?: DependencyList;
  /** 缓存Key*/
  key?: string;
}

let cache: { [key: string]: () => Promise<any> } = {};

export const refetchKey = (key: string) => {
  if (cache[key]) cache[key]();
};

export const handleNetworkError = (toast:any, errStatus?: number): void => {
  
  const networkErrMap: any = {
    '400': '错误的请求', // token 失效
    '401': '未授权，请重新登录',
    '403': '拒绝访问',
    '404': '请求错误，未找到该资源',
    '405': '请求方法未允许',
    '408': '请求超时',
    '500': '服务器端出错',
    '501': '网络未实现',
    '502': '网络错误',
    '503': '服务不可用',
    '504': '网络超时',
    '505': 'http版本不支持该请求'
  }
  if (errStatus) {
    toast({
      title: '网络错误',
      description: networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`
    })
    return
  }
  toast({
    title: '网络错误',
    description: `无法连接到服务器！`
  })
}

export const handleAuthError = (toast:any,errno: string): boolean => {
  const authErrMap: any = {
    101004: '登录失效，需要重新登录', // token 失效
    '10032': '您太久没登录，请重新登录~', // token 过期
    '10033': '账户未绑定角色，请联系管理员绑定角色',
    '10034': '该用户未注册，请联系管理员注册用户',
    '10035': 'code 无法获取对应第三方平台用户',
    '10036': '该账户未关联员工，请联系管理员做关联',
    '10037': '账号已无效',
    '10038': '账号未找到'
  }

  //if (authErrMap.hasOwnProperty(errno)) {
  if (Object.prototype.hasOwnProperty.call(authErrMap, errno)) {
    toast({
      title: 'Auth错误',
      description: authErrMap[errno]
    })
    return false
  }

  return true
}

export const handleGeneralError = (toast:any, errno: number, errmsg: string): boolean => {
  if (errno !== 0) {
    toast({
      title: '错误',
      description: errmsg
    })
    return false
  }

  return true
}




export default function useFetch<T, J>(
  request: (param: J) => Promise<T>,
  option: optionType = { deps: [] },
): FetchResult<T, J> {

  const { toast } = useToast()
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<T> | null>(null);
  const [isLoading, setIsLoading] = useState(!option.manual);

  const fetchData = async (param?: J) => {
    setIsLoading(true);
    try {
      const response = await request(param!);
      setData(response);
    } catch (error) {
      setError(error as AxiosError<T>);
    } finally {
      setIsLoading(false);
    }
  };

  if (option.key) {
    cache[option.key] = fetchData;
  }

  // 如果是自动的就等自动执行完，在允许deps
  let allowFetch = useRef(option.manual);
  useEffect(() => {
    if (option.deps?.length && allowFetch.current) {
      fetchData();
    }
  }, option.deps);

  useEffect(() => {
    if (!option.manual) {
      fetchData();
      setTimeout(() => {
        allowFetch.current = true;
      }, 0);
    }
  }, []);

  return {
    data,
    error,
    isLoading,
    setData,
    refetch: fetchData,
  };
}
