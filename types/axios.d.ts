/* eslint-disable */
import * as axios from "axios";

// 扩展 axios 数据返回类型，可自行扩展
declare module "axios" {
  export interface AxiosResponse<T = any> {
    errno: number;
    data: T;
    message?: string;
    [key: string]: T;
  }

  declare interface ListData<T> {
    list: T[];
    count: number;
  }

  export type RespListData<T> = AxiosResponse<ListData<T>>;

  export interface FcResponse<T> {
    errno: number;
    message: string;
    data: T;
  }

  export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>;

  declare interface UploadData {
    urls: string[];
  }
  export type ResUploadData = FcResponse<UploadData>;
}
