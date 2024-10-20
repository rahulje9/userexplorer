import { axiosInstance } from "./axiosAPI"

export const fetchUsers = (page = 0, limit = 20) =>
  axiosInstance.get(`/users?limit=${limit}&skip=${page}`)

export const fetchUsersPost = (userId = 0, page = 0, limit = 20) =>
  axiosInstance.get(`/users/${userId}/posts?limit=${limit}&skip=${page}`)
