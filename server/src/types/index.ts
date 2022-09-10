import { Document } from 'mongoose'
import { Request } from 'express'

export type errorType = {
  statusCode: number
  message: string | any
  stack?: string
  isOperational?: boolean
}

// Model Types

export interface IUser extends Document {
  name: string
  email: string
  password: string
  _id: string
  blacklisted: boolean
}

export interface IToken extends Document {
  token: string
  user: string
  expires: string
}

export interface ICustomer extends Document {
  firstname: string
  lastname: string
  email: string
  phone: string
  _id: string
  user: string
}

export interface IProducts extends Document {
  name: string
  supplier?: string
  manufacturer?: string
  _id: string
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
  user: string
  quantity: number
}

export interface IInvoice extends Document {
  subject: string
  invoice_number: string
  user: string
  customer: string
  issued_date: string
  due_date: string
  items: {
    qty: number
    productId: string | null
  }[]
  notes: string
  _id: string
}

// Model Types

// Input Types

export type CreateNewUserType = {
  email: string
  password: string
  name: string
}

export type CreateNewCustomerType = {
  firstname: string
  lastname: string
  email: string
  phone: string
}

export type CreateNewProductType = {
  name: string
  supplier?: string
  manufacturer?: string
  _id: string
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
  user: string
  quantity?: number
}

export type CreateNewInvoiceType = {
  subject: string
  user: string
  invoice_number: string
  customer: string
  issued_date: string
  due_date: string
  items: {
    qty: number
    productId: string | null
  }[]
  notes?: string
}

// Input Types

// Service Types

export interface GenerateTokenType {
  user: string
  expires: string
}

export interface SaveTokenType extends GenerateTokenType {
  token: string
}

export interface GetCustomersByQueryType {
  firstname?: string
  lastname?: string
  phone?: string
  email?: string
}

// Service Types
