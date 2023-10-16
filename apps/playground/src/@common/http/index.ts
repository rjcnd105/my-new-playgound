import type { Method as AxiosMethod, ResponseType as AxiosResponseType } from 'axios'

export type Method = Extract<AxiosMethod, 'GET' | 'DELETE' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'>
export type ResponseType = AxiosResponseType
export type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream'
