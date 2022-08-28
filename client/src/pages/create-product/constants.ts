import { CreateNewProduct } from './types'

export const initialState: CreateNewProduct = {
  name: '',
  supplier: '',
  manufacturer: '',
  serial_number: '',
  RAM: '',
  ROM: '',
  processor: '',
  size: '',
  fingerprint: false,
  touch: false,
  dedicated: false,
  imei: '',
  color: '',
  battery_health: '',
  image: '',
  costprice: 0,
  sellingprice: 0,
  quantity: 1,
}

export const selectOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
]
