import { Document } from 'mongoose'

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

// Model Types

// Input Types

export type CreateNewUserType = {
  email: string
  password: string
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

// Service Types
