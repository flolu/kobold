import axios, {AxiosError, AxiosResponse} from 'axios'
import {IncomingMessage, ServerResponse} from 'http'

import {QueryResponse} from './fetcher'

const getError = (error: AxiosError) => {
  if (error.isAxiosError && error.response) return error.response.data
  return 'Unexpected error'
}

const handleRequest = async (request: () => Promise<AxiosResponse>) => {
  try {
    return await request()
  } catch (error: any) {
    throw getError(error)
  }
}

export const fetcherSSR = async <T>(
  req: IncomingMessage,
  _res: ServerResponse,
  url: string,
): Promise<QueryResponse<T>> => {
  try {
    const request = () =>
      axios.get(url, {
        headers: {cookie: req.headers.cookie || ''},
        responseType: 'json',
      })
    const response = await handleRequest(request)
    const {data} = response
    return [null, data]
  } catch (error: any) {
    return [error as any, null]
  }
}
