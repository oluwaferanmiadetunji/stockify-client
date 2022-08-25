import axios from 'axios'
import { API_ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import {
  setCustomers,
  addCustomers,
  deleteCustomer,
  setFilter,
  updateCustomer,
} from 'redux-store/customers.slice'
import { updateCount } from 'redux-store/analytics.slice'

import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'
import { MakeCreateCustomerRequestInterface } from './types'

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

export const makeSingleCustomerRequest = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_ROUTES.CUSTOMERS}/${id}`)
    return response.data
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
    dispatch(updateCount({ type: 'increase', value: 'customer' }))
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
    await axios.delete(`${API_ROUTES.CUSTOMERS}/${id}`)
    toast.success('Customer deleted successfully')
    dispatch(deleteCustomer(id))
    dispatch(updateCount({ type: 'decrease', value: 'customer' }))
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const makeUpdateCustomerRequest = async (
  id: string,
  payload: MakeCreateCustomerRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<any> => {
  try {
    const response = await axios.patch(`${API_ROUTES.CUSTOMERS}/${id}`, payload)
    toast.success('Customer updated successfully')
    dispatch(updateCustomer(response.data))
    return response.data
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}
