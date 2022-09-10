import httpStatus from 'http-status'
import { Invoice } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewInvoiceType } from '../types'
import { generateRandomString } from '../utils/helpers'
import logger from '../config/logger'

export const addInvoice = async (body: CreateNewInvoiceType) => {
  const isInvoiceNumberExists = await Invoice.findOne({
    invoice_number: body.invoice_number,
  })

  if (isInvoiceNumberExists) {
    logger.error('Invoice number exists already')
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice number exists already')
  }

  const invoice = await Invoice.create({
    _id: generateRandomString(),
    ...body,
  })

  return invoice
}
