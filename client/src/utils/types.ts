export interface MakeLoginRequestInterface {
  email: string
  password: string
}

export interface MakeCreateCustomerRequestInterface {
  firstname: string
  lastname: string
  email: string
  phone: string
}

export interface CreateNewProduct {
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
}

export type GRAPH_OPTIONS_TYPE = {
  label: string
  value: string
}
