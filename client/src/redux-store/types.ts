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

export interface ProductState {
  products: {
    id: string
    name: string
    supplier?: string
    manufacturer?: string
    serial_number?: string
    RAM?: string
    ROM?: string
    processor?: string
    size?: string
    fingerprint?: boolean
    touch?: boolean
    dedicated?: boolean
    imei?: string
    color: string
    battery_health?: string
    image?: string
    price: number
    createdAt: string
  }[]
  page: number
  limit: number
  totalPages: number
  count: number
}

export interface AnalyticsInterface {
  customer: number
  product: number
}
