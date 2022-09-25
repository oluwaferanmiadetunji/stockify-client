import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { AnalyticsInterface } from './types'

const initialState: AnalyticsInterface = {
  customer: 0,
  product: 0,
  invoice: 0,
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (
      state: AnalyticsInterface,
      action: PayloadAction<AnalyticsInterface>,
    ) => {
      state.customer = action.payload.customer
      state.product = action.payload.product
      state.invoice = action.payload.invoice
    },
    updateCount: (
      state: AnalyticsInterface,
      action: PayloadAction<{
        type: 'increase' | 'decrease'
        value: 'customer' | 'product' | 'invoice'
      }>,
    ) => {
      switch (action.payload.value) {
        case 'customer':
          action.payload.type === 'increase'
            ? (state.customer = state.customer + 1)
            : (state.customer = state.customer - 1)
          break

        case 'product':
          action.payload.type === 'increase'
            ? (state.product = state.product + 1)
            : (state.product = state.product - 1)
          break

        case 'invoice':
          action.payload.type === 'increase'
            ? (state.invoice = state.invoice + 1)
            : (state.invoice = state.invoice - 1)
          break
        default:
          break
      }
    },
  },
})

export const { setAnalyticsData, updateCount } = analyticsSlice.actions

export const selectAnalyticsState = (state: RootState) => state.analytics

export default analyticsSlice.reducer
