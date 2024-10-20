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

export const defaultUserPostData = {
  id: 0,
  title: "",
  body: "",
  tags: [],
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  views: 0,
  userId: 0,
}
