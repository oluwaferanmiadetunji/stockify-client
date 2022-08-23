import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { productService } from '../services'
import { pickQueryParams } from '../utils/helpers'

export const createNewProduct = catchAsync(async (req, res) => {
  try {
    const product = await productService.createProduct(req.body)

    res.status(httpStatus.CREATED).send(product)
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error adding product' })
  }
})

export const getProducts = catchAsync(async (req, res) => {
  const filter = pickQueryParams(req.query, ['name'])
  const options = pickQueryParams(req.query, [
    'sortBy',
    'limit',
    'page',
    'user',
  ])
  const result = await productService.queryProducts(filter, options)

  res.status(httpStatus.OK).send(result)
})

export const deleteProduct = catchAsync(async (req, res) => {
  try {
    await productService.deleteProductById(req.params.id)

    res.status(httpStatus.OK).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.log('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error deleting product' })
  }
})
