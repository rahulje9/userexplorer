import { types } from "mobx-state-tree"

export const HairModel = types.model({
  color: types.string,
  type: types.string,
})

export const coordinatesModel = types.model({
  lat: types.number,
  lng: types.number,
})

export const AddressModel = types.model({
  address: types.string,
  city: types.string,
  state: types.string,
  stateCode: types.string,
  postalCode: types.string,
  coordinates: coordinatesModel,
  country: types.string,
})

export const BankModel = types.model({
  cardExpire: types.string,
  cardNumber: types.string,
  cardType: types.string,
  currency: types.string,
  iban: types.string,
})

export const CompanyModel = types.model({
  department: types.string,
  name: types.string,
  title: types.string,
  address: AddressModel,
})
export const CryptoModel = types.model({
  coin: types.string,
  wallet: types.string,
  network: types.string,
})

export const USERS = types.model({
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

export const Reactions = types.model({
  likes: types.number,
  dislikes: types.number,
})

export const USERS_POSTS = types.model({
  id: types.number,
  title: types.string,
  body: types.string,
  tags: types.array(types.string),
  reactions: Reactions,
  views: types.number,
  userId: types.number,
})
