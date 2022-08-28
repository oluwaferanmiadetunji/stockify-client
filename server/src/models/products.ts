import { Schema, model } from 'mongoose'
import { IProducts } from '../types'
import { paginate, toJSON } from '../utils/helpers'

const productSchema = new Schema<IProducts>(
  {
    _id: String,
    user: {
      type: String,
      private: true,
    },
    name: {
      type: String,
      unique: true,
    },
    supplier: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    serial_number: {
      type: String,
    },
    RAM: {
      type: String,
    },
    ROM: {
      type: String,
    },
    processor: {
      type: String,
    },
    size: {
      type: String,
    },
    fingerprint: {
      type: Boolean,
    },
    touch: {
      type: Boolean,
    },
    dedicated: {
      type: Boolean,
    },
    imei: {
      type: String,
    },
    color: {
      type: String,
    },
    battery_health: {
      type: String,
    },
    image: {
      type: String,
    },
    costprice: {
      type: Number,
    },
    sellingprice: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
)
// add plugin that converts mongoose to json
productSchema.plugin(toJSON)
productSchema.plugin(paginate)

const Products = model<IProducts>('Products', productSchema)

export default Products
