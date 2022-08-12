/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type errorType = {
  statusCode: number
  message: string | any
  stack?: string
  isOperational?: boolean
}

export type UserType = {
  name: string
  email: string
  password: string
  _id: string
}
