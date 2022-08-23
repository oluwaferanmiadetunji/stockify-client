import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { customerService, productService } from '../services'
import {
  generateRandomCustomers,
  generateRandomProducts,
} from '../utils/seeders'

export const createRandomCustomers = catchAsync(async (req, res) => {
  const user = req.currentUser._id
  const data = generateRandomCustomers(user, req.body.count)
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(`Adding customer ${i + 1}`)

      await customerService.createCustomer(data[i])
    }

    res.status(httpStatus.CREATED).json({ message: 'Random customers added' })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error adding customer' })
  }
})

export const createRandomProducts = catchAsync(async (req, res) => {
  const user = req.currentUser._id
  const data = generateRandomProducts(user, req.body.count)

  try {
    for (let i = 0; i < data.length; i++) {
      console.log(`Adding product ${i + 1}`)

      await productService.createProduct(data[i])
    }

    res.status(httpStatus.CREATED).json({ message: 'Random products added' })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error adding products' })
  }
})
