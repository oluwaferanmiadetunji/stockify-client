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
  costprice: number
  sellingprice: number
  quantity: number
}
