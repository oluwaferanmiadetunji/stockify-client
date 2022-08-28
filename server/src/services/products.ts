import httpStatus from 'http-status'
import { Products } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewProductType } from '../types'
import { generateRandomString } from '../utils/helpers'
import logger from '../config/logger'

export const createProduct = async (body: Partial<CreateNewProductType>) => {
  const isProductExist = await Products.findOne({ name: body.name })

  if (isProductExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product exists already')
  }
  const product = await Products.create({
    ...body,
    _id: generateRandomString(),
  })

  return product
}

export const queryProducts = async (filter: any, options: any) => {
  //@ts-ignore
  const products = await Products.paginate(filter, options)
  return products
}

export const getProductById = async (id: string) => {
  return Products.findById(id)
}

export const updateProductById = async (
  id: string,
  payload: Partial<CreateNewProductType>,
  creator: string,
) => {
  const product = await getProductById(id)
  if (!product) {
    logger.error('Product not found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  if (product.user !== creator) {
    logger.error('Unauthorized. Unable to delete product')
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unable to delete product')
  }

  Object.assign(product, payload)
  await product.save()

  return product
}

export const deleteProductById = async (id: string) => {
  const product = await getProductById(id)

  if (!product) {
    logger.error('Product not found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }
  await product.remove()
  return product
}

export const getTotalCount = async (user: string): Promise<number> => {
  const count = await Products.countDocuments({ user })

  return count
}
