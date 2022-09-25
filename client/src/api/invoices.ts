import axios from 'axios'
import { API_ROUTES, ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import { addInvoicesData, setInvoicesData } from 'redux-store/invoice.slice'
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
) => {
  try {
    const response = await axios.post(`${API_ROUTES.INVOICES}/create`, payload)
    toast.success('Invoice created successfully')
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
