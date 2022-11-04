import axios from 'axios'
import { API_ROUTES, ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import {
  addInvoicesData,
  setInvoicesData,
  updateInvoiceItem,
  deleteInvoice,
  setInvoiceReport,
} from 'redux-store/invoice.slice'
import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'
import { NavigateFunction } from 'react-router-dom'
import { updateCount } from 'redux-store/analytics.slice'

export const makeCreateInvoiceRequest = async (
  payload: any,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void,
  navigate: NavigateFunction,
  message?: string,
) => {
  try {
    const response = await axios.post(`${API_ROUTES.INVOICES}/create`, payload)
    toast.success(message ? message : 'Invoice created successfully')
    dispatch(addInvoicesData(response.data))
    dispatch(updateCount({ type: 'increase', value: 'invoice' }))
    callback()
    navigate(`${ROUTES.INVOICE_DETAILS}?id=${response.data.id}`)
  } catch (err) {
    toast.error('Error creating invoice')
  }
}

export const makeInvoicesQueryRequest = async (
  query: string,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    const response = await axios.get(`${API_ROUTES.INVOICES}/query?${query}`)

    dispatch(
      setInvoicesData({
        invoices: response.data.results,
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

export const makeSingleInvoiceRequest = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_ROUTES.INVOICES}/${id}`)
    return response.data
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const makeUpdateInvoiceRequest = async (
  id: string,
  payload: any,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<any> => {
  try {
    const response = await axios.patch(`${API_ROUTES.INVOICES}/${id}`, payload)
    toast.success('Invoice updated successfully')
    dispatch(updateInvoiceItem(response.data))
    return response.data
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const makeDeleteInvoiceRequest = async (
  payload: { id: string },
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    await axios.delete(`${API_ROUTES.INVOICES}/${payload.id}`)
    toast.success('Invoice deleted successfully')
    dispatch(deleteInvoice(payload.id))
    dispatch(updateCount({ type: 'decrease', value: 'invoice' }))
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}

export const getInvoicesReport = async (
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
): Promise<void> => {
  try {
    const response = await axios.get(`${API_ROUTES.INVOICES}/report`)

    dispatch(setInvoiceReport(response.data.data))
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}
