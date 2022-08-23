import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { CustomerState } from './types'

const initialState: CustomerState = {
  customers: [],
  page: 1,
  limit: 100,
  totalPages: 0,
  count: 0,
}

const authSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (
      state: CustomerState,
      action: PayloadAction<CustomerState>,
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
  },
})

export const { setCustomers, addCustomers, deleteCustomer } = authSlice.actions

export const selectCustomerState = (state: RootState) => state.customers

export default authSlice.reducer
