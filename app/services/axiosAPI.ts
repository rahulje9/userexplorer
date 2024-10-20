import Config from "@/config"
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"

// axios instance for location
export const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 2500,
})

const handleRequest = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> =>
  config

const handleError = (error: AxiosError): Promise<AxiosError> => {
  const parsedError = Object.assign({}, error)
  return Promise.reject(parsedError)
}

const handleResponse = (response: AxiosResponse) => Promise.resolve(response)

axiosInstance.interceptors.request.use(handleRequest)
axiosInstance.interceptors.response.use(handleResponse, handleError)
