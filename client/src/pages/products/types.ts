export interface Data {
  calories: number
  carbs: number
  fat: number
  name: string
  protein: number
}

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void
  order: Order
  orderBy: string
}

export interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

export type Order = 'asc' | 'desc'

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
  price: number
}
