import { Dayjs } from 'dayjs'

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
  inputValue?: string
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
  inputValue?: string
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
  filteredProducts: SingleProductInterface[]
  page: number
  limit: number
  totalPages: number
  count: number
  totalPrice: number
  isFiltered: boolean
}

export interface AnalyticsInterface {
  customer: number
  product: number
  invoice: number
}

export interface CreateNewInvoiceItemInterface {
  qty: number
  price: number
  name: string | null
  productId: string | null
}

export interface CreateNewInvoiceInterface {
  subject: string
  invoice_number: string
  customer_first_name: string
  customer_last_name: string
  customer_email: string
  customer_phone: string
  issued_date: Dayjs
  due_date: Dayjs
  items: CreateNewInvoiceItemInterface[]
  notes: string
}

export interface InvoiceInterface {
  invoices: any[]
  newInvoice: CreateNewInvoiceInterface
  filteredInvoices: any[]
  page: number
  limit: number
  totalPages: number
  count: number
  isFiltered: boolean
  invoice: any
}
