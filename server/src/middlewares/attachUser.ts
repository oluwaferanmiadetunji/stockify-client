import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import httpStatus from 'http-status'

const attachUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const userRecord = await User.findById(req.token.sub)

    if (!userRecord) {
      return res
        .status(httpStatus.EXPECTATION_FAILED)
        .json({ message: 'Unable to find the user' })
    }

    if (userRecord.blacklisted) {
      return res
        .status(httpStatus.SERVICE_UNAVAILABLE)
        .json({ message: 'Your account has been blacklisted' })
    }

    const currentUser = userRecord.toObject()

    Reflect.deleteProperty(currentUser, 'password')

    req.currentUser = currentUser

    req.query.user = currentUser._id

    return next()
  } catch (e) {
    return next(e)
  }
}

export default attachUser
