import { fetchUsers, fetchUsersPost } from "@/services/apis"
import { runInAction } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { USERS, USERS_POSTS } from "./models"

const LIMIT = 20
export const UsersModel = types
  .model("Users")
  .props({
    users: types.array(USERS),
    isLoading: types.boolean,
    totalUsers: types.number,
    totalPages: types.number,
    isLoadingMore: types.boolean,

    posts: types.array(USERS_POSTS),
    isPostLoading: types.boolean,
    totalPost: types.number,
    totalPostPages: types.number,
    isPostLoadingMore: types.boolean,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchUserList(pageNo: number) {
      runInAction(() => {
        store.setProp("isLoading", true)
        if (pageNo !== 0) {
          store.setProp("isLoadingMore", true)
        }
      })
      const res = await fetchUsers(pageNo, LIMIT)

      runInAction(() => {
        store.setProp("isLoading", false)
        if (res?.data?.users) {
          if (pageNo > 0) {
            const currentData = store.users ?? []
            const newData = res?.data?.users ?? []
            const _data = [...currentData, ...newData]
            store.setProp("users", _data)
          } else {
            const totalPages = Math.ceil(res?.data?.total / LIMIT) || LIMIT
            store.setProp("totalUsers", res?.data?.total)
            store.setProp("totalPages", totalPages)

            store.setProp("users", res?.data?.users)
          }
        }
        store.setProp("isLoadingMore", false)
      })
    },
    async fetchUsersPost(userID: number, pageNo: number) {
      runInAction(() => {
        store.setProp("isLoading", true)
        if (pageNo !== 0) {
          store.setProp("isPostLoadingMore", true)
        }
      })
      const res = await fetchUsersPost(userID, pageNo, LIMIT)
      runInAction(() => {
        store.setProp("isPostLoading", false)
        if (res?.data?.posts) {
          if (pageNo > 0) {
            const currentData = store.posts ?? []
            const newData = res?.data?.posts ?? []
            const _data = [...currentData, ...newData]
            store.setProp("posts", _data)
          } else {
            const totalPages = Math.ceil(res?.data?.total / LIMIT) || LIMIT
            store.setProp("totalPost", res?.data?.total)
            store.setProp("totalPostPages", totalPages)
            store.setProp("posts", res?.data?.posts)
            console.log("res", res?.data?.posts)
          }
        }
        store.setProp("isPostLoadingMore", false)
      })
    },
  }))

export interface Users extends Instance<typeof UsersModel> {}
export interface UsersSnapshotOut extends SnapshotOut<typeof UsersModel> {}
export interface UsersSnapshotIn extends SnapshotIn<typeof UsersModel> {}
