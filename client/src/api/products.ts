import axios from 'axios'
import { API_ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import {
  addProducts,
  setProducts,
  deleteProduct,
} from 'redux-store/products.slice'
import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'
import { CreateNewProduct } from './types'

export const makeAddNewProductRequest = async (
  payload: CreateNewProduct,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void,
) => {
  try {
    const response = await axios.post(`${API_ROUTES.PRODUCTS}/create`, payload)
    toast.success('Product added successfully')
    dispatch(addProducts(response.data))
    callback()
  } catch (err) {
    //@ts-ignore
    toast.error('Erroradding product')
  }
}

export const makeProductsQueryRequest = async (
  query: string,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    const response = await axios.get(`${API_ROUTES.PRODUCTS}/query?${query}`)

    dispatch(
      setProducts({
        products: response.data.results,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        count: response.data.totalResults,
      }),
    )
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const makeDeleteProductRequest = async (
  id: string,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    await axios.get(`${API_ROUTES.PRODUCTS}/delete/${id}`)
    toast.success('Product deleted successfully')
    dispatch(deleteProduct(id))
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}
