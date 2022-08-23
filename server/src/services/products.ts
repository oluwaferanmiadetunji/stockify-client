import httpStatus from 'http-status'
import { Products } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewProductType } from '../types'
import { generateRandomString } from '../utils/helpers'

export const createProduct = async (body: Partial<CreateNewProductType>) => {
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
  return Products.findOne({ _id: id })
}

export const getProductByName = async (name: string) => {
  return Products.find({ name })
}

export const updateProductById = async (
  id: string,
  payload: Partial<CreateNewProductType>,
) => {
  const product = await getProductById(id)
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  Object.assign(product, payload)
  await product.save()

  return product
}

export const deleteProductById = async (id: string) => {
  const product = await getProductById(id)

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }
  await product.remove()
  return product
}

export const getTotalCount = async (user: string): Promise<number> => {
  const count = await Products.countDocuments({ user })

  return count
}