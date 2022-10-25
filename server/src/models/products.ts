import { Schema, model } from 'mongoose'
import { IProducts } from '../types'
import { paginate, toJSON } from '../utils/helpers'

const productSchema = new Schema<IProducts>(
  {
    _id: String,
    user: {
      type: String,
      private: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    serial_number: {
      type: String,
      required: true,
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
    category: {
      type: String,
    },
    costprice: {
      type: Number,
      required: true,
    },
    sellingprice: {
      type: Number,
      required: true,
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
