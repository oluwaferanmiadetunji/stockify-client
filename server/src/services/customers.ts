import httpStatus from 'http-status'
import { Customers } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewCustomerType } from '../types'
import { generateRandomString } from '../utils/helpers'

export const createCustomer = async (customerBody: CreateNewCustomerType) => {
  //@ts-ignore
  if (await Customers.isEmailTaken(customerBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const customer = await Customers.create({
    ...customerBody,
    _id: generateRandomString(),
  })

  return customer
}

export const getCustomerByEmail = async (email: string) => {
  return Customers.findOne({ email })
}

export const queryCustomers = async (filter: any, options: any) => {
  //@ts-ignore
  const users = await Customers.paginate(filter, options)
  return users
}

export const getCustomerById = async (id: string) => {
  return Customers.findOne({ _id: id })
}

export const updateCustomerById = async (
  userId: string,
  payload: Partial<CreateNewCustomerType>,
) => {
  const user = await getCustomerById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (
    payload.email &&
    //@ts-ignore
    (await Customers.isEmailTaken(payload.email, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }

  Object.assign(user, payload)
  await user.save()

  return user
}

export const deleteCustomerById = async (id: string, userId: string) => {
  const user = await getCustomerById(id)

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  if (user.user != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, '')
  }
  await user.remove()
  return user
}

export const getTotalCount = async (user: string): Promise<number> => {
  const count = await Customers.countDocuments({ user })

  return count
}
