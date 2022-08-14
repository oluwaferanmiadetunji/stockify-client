import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import config from '../config'
import LoggerInstance from '../config/logger'
import ApiError from '../utils/ApiError'
import { errorType } from '../types'

export const errorConverter = (
  err: errorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]

    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const ErrorHandler = (err: errorType, req: Request, res: Response) => {
  let { statusCode, message } = err

  statusCode = httpStatus.INTERNAL_SERVER_ERROR
  message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  }

  LoggerInstance.error(err)

  res.status(statusCode).send(response)
}
