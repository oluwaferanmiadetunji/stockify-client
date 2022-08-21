import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { customerService } from '../services'
import { pickQueryParams } from '../utils/helpers'

export const createNewCustomer = catchAsync(async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body)

    res.status(httpStatus.CREATED).send(customer)
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error creating user' })
  }
})

export const getCustomers = catchAsync(async (req, res) => {
  const filter = pickQueryParams(req.query, ['name', 'phone', 'email'])
  const options = pickQueryParams(req.query, ['sortBy', 'limit', 'page'])
  const result = await customerService.queryCustomers(filter, options)

  res.status(httpStatus.OK).send(result)
})

export const deleteCustomer = catchAsync(async (req, res) => {
  try {
    await customerService.deleteCustomerById(req.params.id)

    res.status(httpStatus.OK).json({ message: 'Customer deleted successfully' })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error deleting customer' })
  }
})
