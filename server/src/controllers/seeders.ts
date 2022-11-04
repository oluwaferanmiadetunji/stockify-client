import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { customerService, productService, invoiceService } from '../services'
import {
  generateRandomCustomers,
  generateRandomProducts,
  generateRandomInvoices,
} from '../utils/seeders'
import { pickQueryParams } from '../utils/helpers'

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

export const createRandomInvoices = catchAsync(async (req, res) => {
  const filter = pickQueryParams(req.query, [
    'firstname',
    'lastname',
    'phone',
    'email',
    'user',
  ])
  const options = pickQueryParams(req.query, ['sortBy', 'limit', 'page'])
  const customers = (await customerService.queryCustomers(filter, options))
    .results
  const user = req.currentUser._id
  const products = (await productService.queryProducts(filter, options)).results

  const data = await generateRandomInvoices(
    user,
    req.body.count,
    products,
    customers,
  )

  for (let i = 0; i < data.length; i++) {
    console.log(`Adding ${i + 1} of ${data.length} invoices`)

    await invoiceService.addInvoice(data[i])
  }

  return res.status(httpStatus.CREATED).json({
    message: 'Invoices generated successfully',
  })
})
