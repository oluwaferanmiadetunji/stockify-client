import httpStatus from 'http-status'
import { User } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewUserType } from '../types'
import { generateRandomString } from '../utils/helpers'

export const createUser = async (userBody: CreateNewUserType) => {
  //@ts-ignore
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const user = await User.create({ ...userBody, _id: generateRandomString() })

  return user
}

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email })
}
