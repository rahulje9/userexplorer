import { axiosInstance } from "./axiosAPI"

export const fetchUsers = (page = 0) => axiosInstance.get(`/users?limit=20&skip=${page}`)
