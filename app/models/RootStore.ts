import { Instance, SnapshotOut, types } from "mobx-state-tree"
// import { AuthenticationStoreModel } from "./AuthenticationStore"
// import { EpisodeStoreModel } from "./EpisodeStore"
import { defaultUsersData, UsersModel } from "./Users"

/**
 * A RootStore model.
 */

const _defaultUsersData = { user: defaultUsersData }
export const RootStoreModel = types.model("RootStore").props({
  UserStore: types.optional(UsersModel, {
    ...defaultUsersData,
    isLoading: false,
    totalPages: 0,
    totalUsers: 0,
    isLoadingMore: false,
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
