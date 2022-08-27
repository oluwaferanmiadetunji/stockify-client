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
  price: 0,
}

export const selectOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
]
