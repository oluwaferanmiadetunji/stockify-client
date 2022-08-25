import axios from 'axios'
import { API_ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import { login } from 'redux-store/auth.slice'
import { setAnalyticsData } from 'redux-store/analytics.slice'
import {
  setCustomers,
  addCustomers,
  deleteCustomer,
  setFilter,
} from 'redux-store/customers.slice'
import {
  addProducts,
  setProducts,
  deleteProduct,
} from 'redux-store/products.slice'
import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'
import { storage } from 'utils/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { generateImageTag, saveToken } from 'utils/helpers'
import {
  CreateNewProduct,
  MakeCreateCustomerRequestInterface,
  MakeLoginRequestInterface,
} from './types'

export const makeLoginRequest = async (
  payload: MakeLoginRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void,
) => {
  try {
    const response = await axios.post(API_ROUTES.LOGIN, payload)
    toast.success(response.data.message)
    saveToken(response.data.token)

    dispatch(login({ token: response.data.token, user: response.data.user }))
    callback()
  } catch (err) {
    //@ts-ignore
    toast.error('Error logging in')
  }
}

export const makeCustomerQueryRequest = async (
  query: string,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    const response = await axios.get(`${API_ROUTES.CUSTOMERS}/query?${query}`)

    dispatch(
      setCustomers({
        customers: response.data.results,
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

export const makeCustomerFilterRequest = async (
  query: string,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: { (): void; (): void },
): Promise<void> => {
  try {
    const response = await axios.get(`${API_ROUTES.CUSTOMERS}/query?${query}`)

    dispatch(setFilter(response.data.results))
    callback()
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const makeCreateCustomerRequest = async (
  payload: MakeCreateCustomerRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void,
): Promise<void> => {
  try {
    const response = await axios.post(`${API_ROUTES.CUSTOMERS}/create`, payload)
    toast.success('Customer added successfully')
    dispatch(addCustomers(response.data))
    callback()
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const makeDeleteCustomerRequest = async (
  id: string,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    await axios.get(`${API_ROUTES.CUSTOMERS}/delete/${id}`)
    toast.success('Customer deleted successfully')
    dispatch(deleteCustomer(id))
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

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

export const saveFileRequest = async (file: any) => {
  let imageURL = ''

  try {
    const storageRef = ref(storage, generateImageTag())
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      () => {},
      (err) => {
        toast.error('Error uploading file!')
        return null
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          toast.success('File uploaded successfully')
          // imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${url}?alt=media`
          imageURL = url
        })
      },
    )

    return imageURL
  } catch (err) {
    //@ts-ignore
    toast.error('Error uploading file: ', err)
  }
}

export const getAnalyticsData = async (
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  try {
    const response = await axios.get(API_ROUTES.ANALYTICS_REPORTS)

    dispatch(setAnalyticsData(response.data))
  } catch (err) {}
}
