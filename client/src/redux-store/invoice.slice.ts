import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { InvoiceInterface, CreateNewInvoiceInterface } from './types'
import { generateInvoiceNumber } from 'utils/helpers'
import dayjs from 'dayjs'

const singleItem = { name: null, qty: 1, price: 0, productId: null }

const invoiceState = {
  subject: '',
  invoice_number: generateInvoiceNumber(),
  customer_first_name: '',
  customer_last_name: '',
  customer_email: '',
  customer_phone: '',
  issued_date: dayjs(new Date().toISOString()),
  due_date: dayjs(new Date().setDate(new Date().getDate() + 10)),
  items: [singleItem],
  notes: '',
}

const initialState: InvoiceInterface = {
  invoices: [],
  newInvoice: invoiceState,
  filteredInvoices: [],
  page: 1,
  limit: 100,
  totalPages: 0,
  count: 0,
  isFiltered: false,
  invoice: {},
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoicesData: (state: InvoiceInterface, action: PayloadAction<any>) => {
      state.invoices = action.payload.invoices
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.totalPages = action.payload.totalPages
      state.count = action.payload.count
    },
    addInvoicesData: (state: InvoiceInterface, action: PayloadAction<any>) => {
      state.invoices = [action.payload, ...state.invoices]
    },
    updateNewInvoiceCreate: (
      state: InvoiceInterface,
      action: PayloadAction<Partial<CreateNewInvoiceInterface>>,
    ) => {
      state.newInvoice = { ...state.newInvoice, ...action.payload }
    },
    addNewInvoiceItem: (
      state: InvoiceInterface,
      action: PayloadAction<null>,
    ) => {
      state.newInvoice.items = [...state.newInvoice.items, singleItem]
    },
    deleteInvoiceItem: (
      state: InvoiceInterface,
      action: PayloadAction<number>,
    ) => {
      state.newInvoice.items.splice(action.payload, 1)
    },
    updateInvoiceItem: (
      state: InvoiceInterface,
      action: PayloadAction<{
        index: number
        name: string
        payload: string | number
      }>,
    ) => {
      const { index, name, payload } = action.payload
      let modifiedItems = [...state.newInvoice.items]

      modifiedItems[index] = {
        ...modifiedItems[index],
        [name]: payload,
      }
      state.newInvoice = {
        ...state.newInvoice,
        items: modifiedItems,
      }
    },
    clearNewInvoice: (state: InvoiceInterface, action: PayloadAction<null>) => {
      state.newInvoice = {
        ...invoiceState,
        invoice_number: generateInvoiceNumber(),
      }
    },
    setInvoicesFilter: (
      state: InvoiceInterface,
      action: PayloadAction<any[]>,
    ) => {
      state.filteredInvoices = action.payload
      state.isFiltered = true
    },
    cancelInvoicesFilter: (
      state: InvoiceInterface,
      action: PayloadAction<void>,
    ) => {
      state.filteredInvoices = []
      state.isFiltered = false
    },
    setSingleInvoiceData: (
      state: InvoiceInterface,
      action: PayloadAction<any>,
    ) => {
      state.invoice = action.payload
    },
  },
})

export const {
  setInvoicesData,
  updateNewInvoiceCreate,
  addNewInvoiceItem,
  deleteInvoiceItem,
  updateInvoiceItem,
  clearNewInvoice,
  addInvoicesData,
  setSingleInvoiceData,
} = invoiceSlice.actions

export const selectInvoiceState = (state: RootState) => state.invoice

export default invoiceSlice.reducer
