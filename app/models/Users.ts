import { fetchUsers } from "@/services/apis"
import { runInAction } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const defaultUsersData = {
  id: 0,
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 0,
  gender: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  image: "",
  bloodGroup: "",
  height: 0,
  weight: 0,
  eyeColor: "",
  hair: {
    color: "",
    type: "",
  },

  ip: "",
  address: {
    address: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    country: "",
  },
  macAddress: "",
  university: "",
  bank: { cardExpire: "", cardNumber: "", cardType: "", currency: "", iban: "" },
  company: {
    department: "",
    name: "",
    title: "",
    address: {
      address: "",
      city: "",
      state: "",
      stateCode: "",
      postalCode: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      country: "",
    },
  },
  ein: "",
  ssn: "",
  userAgent: "",
  crypto: {
    coin: "",
    wallet: "",
    network: "",
  },
  role: "",
}

const HairModel = types.model({
  color: types.string,
  type: types.string,
})

const coordinatesModel = types.model({
  lat: types.number,
  lng: types.number,
})

const AddressModel = types.model({
  address: types.string,
  city: types.string,
  state: types.string,
  stateCode: types.string,
  postalCode: types.string,
  coordinates: coordinatesModel,
  country: types.string,
})

const BankModel = types.model({
  cardExpire: types.string,
  cardNumber: types.string,
  cardType: types.string,
  currency: types.string,
  iban: types.string,
})

const CompanyModel = types.model({
  department: types.string,
  name: types.string,
  title: types.string,
  address: AddressModel,
})
const CryptoModel = types.model({
  coin: types.string,
  wallet: types.string,
  network: types.string,
})

const USERS = types.model({
  id: types.number,
  firstName: types.string,
  lastName: types.string,
  maidenName: types.string,
  age: types.number,
  gender: types.string,
  email: types.string,
  phone: types.string,
  username: types.string,
  password: types.string,
  birthDate: types.string,
  image: types.string,
  bloodGroup: types.string,
  height: types.number,
  weight: types.number,
  eyeColor: types.string,
  hair: HairModel,

  ip: types.string,
  address: AddressModel,
  macAddress: types.string,
  university: types.string,
  bank: BankModel,
  company: CompanyModel,
  ein: types.string,
  ssn: types.string,
  userAgent: types.string,
  crypto: CryptoModel,
  role: types.string,
})
/**
 * This represents an episode of React Native Radio.
 */

export const UsersModel = types
  .model("Users")
  .props({
    users: types.array(USERS),
    isLoading: types.boolean,
    totalUsers: types.number,
    totalPages: types.number,
    isLoadingMore: types.boolean,
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
      const res = await fetchUsers(pageNo)

      runInAction(() => {
        store.setProp("isLoading", false)
        if (res?.data?.users) {
          if (pageNo > 0) {
            const currentData = store.users ?? []
            const newData = res?.data?.users ?? []
            const _data = [...currentData, ...newData]
            store.setProp("users", _data)
          } else {
            const totalPages = Math.ceil(res?.data?.total?.total / 10) || 10
            store.setProp("totalUsers", res?.data?.total)
            store.setProp("totalPages", totalPages)

            store.setProp("users", res?.data?.users)
          }
        }
        store.setProp("isLoadingMore", false)
      })
    },
    // async fetchEpisodes() {
    //   const response = await api.getEpisodes()
    //   if (response.kind === "ok") {
    //     store.setProp("episodes", response.episodes)
    //   } else {
    //     console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
    //   }
    // },
    // addFavorite(episode: Episode) {
    //   store.favorites.push(episode)
    // },
    // removeFavorite(episode: Episode) {
    //   store.favorites.remove(episode)
    // },
  }))
  .views((user) => ({
    // get parsedTitleAndSubtitle() {
    //   const defaultValue = { title: episode.title?.trim(), subtitle: "" }
    //   if (!defaultValue.title) return defaultValue
    //   const titleMatches = defaultValue.title.match(/^(RNR.*\d)(?: - )(.*$)/)
    //   if (!titleMatches || titleMatches.length !== 3) return defaultValue
    //   return { title: titleMatches[1], subtitle: titleMatches[2] }
    // },
    // get datePublished() {
    //   try {
    //     const formatted = formatDate(episode.pubDate)
    //     return {
    //       textLabel: formatted,
    //       accessibilityLabel: translate("demoPodcastListScreen:accessibility.publishLabel", {
    //         date: formatted,
    //       }),
    //     }
    //   } catch (error) {
    //     return { textLabel: "", accessibilityLabel: "" }
    //   }
    // },
    // get duration() {
    //   const seconds = Number(episode.enclosure.duration)
    //   const h = Math.floor(seconds / 3600)
    //   const m = Math.floor((seconds % 3600) / 60)
    //   const s = Math.floor((seconds % 3600) % 60)
    //   const hDisplay = h > 0 ? `${h}:` : ""
    //   const mDisplay = m > 0 ? `${m}:` : ""
    //   const sDisplay = s > 0 ? s : ""
    //   return {
    //     textLabel: hDisplay + mDisplay + sDisplay,
    //     accessibilityLabel: translate("demoPodcastListScreen:accessibility.durationLabel", {
    //       hours: h,
    //       minutes: m,
    //       seconds: s,
    //     }),
    //   }
    // },
  }))

export interface Users extends Instance<typeof UsersModel> {}
export interface UsersSnapshotOut extends SnapshotOut<typeof UsersModel> {}
export interface UsersSnapshotIn extends SnapshotIn<typeof UsersModel> {}
