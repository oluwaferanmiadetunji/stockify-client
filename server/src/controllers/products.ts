import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { productService } from '../services'
import { pickQueryParams } from '../utils/helpers'
import logger from '../config/logger'

export const createNewProduct = catchAsync(async (req, res) => {
  const user = req.currentUser._id

  try {
    const product = await productService.createProduct({ ...req.body, user })

    res.status(httpStatus.CREATED).send(product)
  } catch (error) {
    console.log(error)
    logger.error('Error: ', JSON.stringify(error))
    //@ts-ignore

    res
      .status(httpStatus.CONFLICT)
      .json({ message: 'Error adding product', error })
  }
})

export const getProducts = catchAsync(async (req, res) => {
  const filter = pickQueryParams(req.query, ['name', 'category', 'user'])
  const options = pickQueryParams(req.query, ['sortBy', 'limit', 'page'])
  const result = await productService.queryProducts(filter, options)

  res.status(httpStatus.OK).send(result)
})

export const deleteProduct = catchAsync(async (req, res) => {
  try {
    await productService.deleteProductById(req.params.id)

    res.status(httpStatus.OK).json({ message: 'Product deleted successfully' })
  } catch (error) {
    logger.error('Error: ', JSON.stringify(error))

    res.status(httpStatus.CONFLICT).json({ message: 'Error deleting product' })
  }
})

export const getProduct = catchAsync(async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id)
    res.status(httpStatus.OK).send(product)
  } catch (error) {
    logger.error('Error: ', JSON.stringify(error))

    res.status(httpStatus.NOT_FOUND).json({ message: 'Error getting product' })
  }
})

export const updateProduct = catchAsync(async (req, res) => {
  const user = req.currentUser._id
  const id = req.params.id

  try {
    const customer = await productService.updateProductById(id, req.body, user)
    res.status(httpStatus.OK).send(customer)
  } catch (error) {
    logger.error('Error: ', JSON.stringify(error))

    res.status(httpStatus.NOT_FOUND).json({ message: 'Error updating product' })
  }
})
