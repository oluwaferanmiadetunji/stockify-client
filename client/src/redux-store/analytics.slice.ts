import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { AnalyticsInterface } from './types'

const initialState: AnalyticsInterface = {
  customer: 0,
  product: 0,
}

const authSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (
      state: AnalyticsInterface,
      action: PayloadAction<AnalyticsInterface>,
    ) => {
      state.customer = action.payload.customer
      state.product = action.payload.product
    },
  },
})

export const { setAnalyticsData } = authSlice.actions

export const selectAnalyticsState = (state: RootState) => state.analytics

export default authSlice.reducer
