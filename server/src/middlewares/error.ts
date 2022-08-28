import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import config from '../config'
import logger from '../config/logger'
import ApiError from '../utils/ApiError'
import { errorType } from '../types'
import mongoose from 'mongoose'

export const errorConverter = (err: any, req: any, res: any, next: any) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  console.log('EC: ', error)
  next(error)
}

export const ErrorHandler = (err: any, req: any, res: any, next: any) => {
  let { statusCode, message } = err
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  if (config.env === 'development') {
    logger.error(err)
  }
  console.log({ response, statusCode })
  res.status(statusCode).send(response)
}
