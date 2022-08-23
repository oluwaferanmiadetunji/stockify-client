import { Schema, model } from 'mongoose'
import validator from 'validator'
import { ICustomer } from '../types'
import { paginate, toJSON } from '../utils/helpers'

const customerSchema = new Schema<ICustomer>(
  {
    _id: String,
    user: {
      type: String,
      private: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email')
        }
      },
    },
  },
  {
    timestamps: true,
  },
)
// add plugin that converts mongoose to json
customerSchema.plugin(toJSON)
customerSchema.plugin(paginate)

customerSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
}

const Customers = model<ICustomer>('Customers', customerSchema)

export default Customers
