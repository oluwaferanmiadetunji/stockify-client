import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { customerService } from '../services'
import { generateRandomCustomers } from '../utils/seeders'

export const createRandomCustomers = catchAsync(async (req, res) => {
  const data = generateRandomCustomers(req.body.count)
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(`Adding customer ${i + 0}`)

      await customerService.createCustomer(data[i])
    }

    res.status(httpStatus.CREATED).json({ message: 'Random customers added' })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error creating user' })
  }
})
