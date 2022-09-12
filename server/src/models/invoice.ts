import { Schema, model } from 'mongoose'
import { IInvoice } from '../types'
import { paginate, toJSON } from '../utils/helpers'

const invoiceSchema = new Schema<IInvoice>(
  {
    _id: String,
    user: {
      type: String,
      private: true,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    invoice_number: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    issued_date: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    items: [
      {
        qty: Number,
        productId: String,
        costPrice: Number,
        sellingPrice: Number,
      },
    ],
    notes: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)
// add plugin that converts mongoose to json
invoiceSchema.plugin(toJSON)
invoiceSchema.plugin(paginate)

const Invoice = model<IInvoice>('Invoice', invoiceSchema)

export default Invoice
