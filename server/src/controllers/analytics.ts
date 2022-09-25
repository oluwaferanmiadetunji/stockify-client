import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { customerService, productService, invoiceService } from '../services'

export const getReports = catchAsync(async (req, res) => {
  const user = req.currentUser._id

  try {
    const customer = await customerService.getTotalCount(user)
    const product = await productService.getTotalCount(user)
    const invoice = await invoiceService.getTotalCount(user)

    res.status(httpStatus.OK).json({ customer, product, invoice })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error getting report' })
  }
})
