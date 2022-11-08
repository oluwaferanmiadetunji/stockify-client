import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { customerService, productService, invoiceService } from '../services'
import logger from '../config/logger'
import { MONTH_LABELS } from '../utils/constants'

export const getReports = catchAsync(async (req, res) => {
  const user = req.currentUser._id

  try {
    const customer = await customerService.getTotalCount(user)
    const product = await productService.getTotalCount(user)
    const invoice = await invoiceService.getTotalCount({ user })

    res.status(httpStatus.OK).json({ customer, product, invoice })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error getting report' })
  }
})

export const getSalesGraphByYear = catchAsync(async (req, res) => {
  const user = req.currentUser._id
  const { year } = req.body

  try {
    const response = await invoiceService.fetchPaidInvoicesByDatePaid({
      year,
      user,
    })

    res.status(httpStatus.OK).json({ data: response, label: MONTH_LABELS })
  } catch (error) {
    logger.error('Error: ', JSON.stringify(error))

    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ message: 'Error getting sales graph' })
  }
})

export const getSalesGraphByMonths = catchAsync(async (req, res) => {
  const user = req.currentUser._id
  const { year } = req.body

  try {
    const response = await invoiceService.fetchPaidInvoicesByDatePaid({
      year,
      user,
    })

    res.status(httpStatus.OK).json({ data: response, label: MONTH_LABELS })
  } catch (error) {
    logger.error('Error: ', JSON.stringify(error))

    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ message: 'Error getting sales graph' })
  }
})
