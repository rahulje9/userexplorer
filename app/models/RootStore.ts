import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UsersModel } from "./UsersListModel"
import { defaultUserPostData, defaultUsersData } from "./defaultData"
/**
 * A RootStore model.
 */

export const RootStoreModel = types.model("RootStore").props({
  UserStore: types.optional(UsersModel, {
    ...defaultUsersData,
    isLoading: false,
    totalPages: 0,
    totalUsers: 0,
    isLoadingMore: false,

    ...defaultUserPostData,
    isPostLoading: false,
    totalPost: 0,
    totalPostPages: 0,
    isPostLoadingMore: false,
  }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
