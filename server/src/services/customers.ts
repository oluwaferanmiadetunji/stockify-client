import httpStatus from 'http-status'
import { Customers } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewCustomerType, GetCustomersByQueryType } from '../types'
import { generateRandomString } from '../utils/helpers'
import logger from '../config/logger'

export const createCustomer = async (customerBody: CreateNewCustomerType) => {
  //@ts-ignore
  if (await Customers.isEmailTaken(customerBody.email)) {
    logger.error('Email already taken')
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const customer = await Customers.create({
    ...customerBody,
    _id: generateRandomString(),
  })

  return customer
}

export const getCustomerByEmail = async (email: string) => {
  const customer = await Customers.findOne({ email })

  return customer
}

export const queryCustomers = async (filter: any, options: any) => {
  //@ts-ignore
  const users = await Customers.paginate(filter, options)
  return users
}

export const getCustomerById = async (id: string) => {
  const customer = Customers.findById(id)

  return customer
}

export const updateCustomerById = async (
  userId: string,
  payload: Partial<CreateNewCustomerType>,
  creator: string,
) => {
  const user = await getCustomerById(userId)

  if (!user) {
    logger.error('Customer not found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found')
  }

  if (user.user !== creator) {
    logger.error('Unauthorized. Unable to delete customer')
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unable to delete customer')
  }

  if (
    payload.email &&
    //@ts-ignore
    (await Customers.isEmailTaken(payload.email, userId))
  ) {
    logger.error('Email already taken')
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }

  Object.assign(user, payload)
  await user.save()

  return user
}

export const deleteCustomerById = async (id: string, userId: string) => {
  const user = await getCustomerById(id)

  if (!user) {
    logger.error('Customer not found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found')
  }
  if (user.user != userId) {
    logger.error('Unauthorized. Unable to delete customer')
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unable to delete customer')
  }
  await user.remove()
  return user
}

export const getTotalCount = async (user: string): Promise<number> => {
  const count = await Customers.countDocuments({ user })

  return count
}

export const getCustomersByQuery = async (query: GetCustomersByQueryType) => {
  const customer = await Customers.findOne({ ...query })

  return customer
}
