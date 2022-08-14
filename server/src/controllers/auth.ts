import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { userService, tokenService } from '../services'
import ApiError from '../utils/ApiError'

export const createNewUser = catchAsync(async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userService.createUser({ email, password })

    res.status(httpStatus.CREATED).send(user)
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error creating user' })
  }
})

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  const user = await userService.getUserByEmail(email)

  //@ts-ignore
  if (!user || !(await user.isPasswordMatch(password))) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' })
  }

  const token = await tokenService.generateAuthenticationToken(user._id)

  res.status(httpStatus.OK).json({ message: 'Login successful', token, user })
})
