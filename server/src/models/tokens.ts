import { Schema, model } from 'mongoose'
import { IToken } from '../types'

const tokenSchema = new Schema<IToken>(
  {
    _id: String,
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    expires: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Token = model<IToken>('Token', tokenSchema)

export default Token
