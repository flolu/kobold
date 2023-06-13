import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'

export const getError = (error: AxiosError) => {
  if (error.isAxiosError && error.response) return error.response.data as any
  return 'unexpected error'
}

export interface ErrorResponse {
  name: string
  message: string
}

export type QueryResponse<T> = [error: ErrorResponse | null, data: T | null]
export type EmptyResponse = Promise<QueryResponse<unknown>>

const handleRequest = async <T>(executeRequest: () => Promise<AxiosResponse>): Promise<T> => {
  try {
    const response = await executeRequest()
    return response.data
  } catch (error: any) {
    throw getError(error)
  }
}

export const fetcher = async <T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.get(url, {...config, withCredentials: true})
    const data = await handleRequest<T>(request)
    return [null, data]
  } catch (error: any) {
    return [error, null]
  }
}

export const poster = async <T>(
  url: string,
  payload: unknown = undefined,
  config: AxiosRequestConfig = {},
): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.post<T>(url, payload, {...config, withCredentials: true})
    const data = await handleRequest<T>(request)
    return [null, data]
  } catch (error: any) {
    return [error, null]
  }
}
