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
  category: string
}

export type AddProductFormProps = {
  state: CreateNewProduct
  handleChange: (event: {
    target: {
      name: any
      value: any
    }
  }) => void
}

export type UploadImageProps = {
  state: CreateNewProduct
  setStep: React.Dispatch<React.SetStateAction<number>>
  setState: React.Dispatch<React.SetStateAction<CreateNewProduct>>
  onCancel: () => void
}
