import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import {
  CustomerState,
  SingleCustomerState,
  SetCustomersDataInterface,
} from './types'

const initialState: CustomerState = {
  customers: [],
  filteredCustomers: [],
  page: 1,
  limit: 100,
  totalPages: 0,
  count: 0,
  isFiltered: false,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (
      state: CustomerState,
      action: PayloadAction<SetCustomersDataInterface>,
    ) => {
      state.customers = action.payload.customers
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.totalPages = action.payload.totalPages
      state.count = action.payload.count
    },
    addCustomers: (state: CustomerState, action: PayloadAction<any>) => {
      state.customers = [action.payload, ...state.customers]
      state.count = state.count + 1
    },
    deleteCustomer: (state: CustomerState, action: PayloadAction<any>) => {
      const index = state.customers.findIndex(
        (user) => user.id === action.payload,
      )
      state.customers.splice(index, 1)
      state.count = state.count - 1
    },
    updateCustomer: (state: CustomerState, action: PayloadAction<any>) => {
      let index = state.customers.findIndex(
        (customer) => customer.id === action.payload.id,
      )
      state.customers[index] = action.payload
    },
    setFilter: (
      state: CustomerState,
      action: PayloadAction<SingleCustomerState[]>,
    ) => {
      state.filteredCustomers = action.payload
      state.isFiltered = true
    },
    cancelFilter: (state: CustomerState, action: PayloadAction<void>) => {
      state.filteredCustomers = []
      state.isFiltered = false
    },
  },
})

export const {
  setCustomers,
  addCustomers,
  deleteCustomer,
  setFilter,
  cancelFilter,
  updateCustomer,
} = customerSlice.actions

export const selectCustomerState = (state: RootState) => state.customers

export default customerSlice.reducer
