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

export type SingleCustomerState = {
  firstname: string
  lastname: string
  phone: string
  email: string
  createdAt: string
  id: string
}

export interface CustomerState {
  customers: SingleCustomerState[]
  filteredCustomers: SingleCustomerState[]
  page: number
  limit: number
  totalPages: number
  count: number
  isFiltered: boolean
}

export interface SetCustomersDataInterface {
  customers: SingleCustomerState[]
  page: number
  limit: number
  totalPages: number
  count: number
}

export interface SingleProductInterface {
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
  costprice: number
  sellingprice: number
  createdAt: string
  quantity: number
}

export interface SetProductDataInterface {
  products: SingleProductInterface[]
  page: number
  limit: number
  totalPages: number
  count: number
}

export interface ProductState {
  products: SingleProductInterface[]
  page: number
  limit: number
  totalPages: number
  count: number
  totalPrice: number
}

export interface AnalyticsInterface {
  customer: number
  product: number
}
