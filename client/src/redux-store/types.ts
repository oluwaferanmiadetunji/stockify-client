export interface AuthState {
  isLogged: boolean
  user: {
    email: string
    blacklisted: boolean
    createdAt: string
    id: string
    name: string
  }
  token: string
}

export interface LoginInterface {
  user: {
    email: string
    blacklisted: boolean
    createdAt: string
    id: string
    name: string
  }
  token: string
}

export interface CustomerState {
  customers: {
    name: string
    phone: string
    email: string
    createdAt: string
    id: string
  }[]
  page: number
  limit: number
  totalPages: number
  count: number
}
