import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { AnalyticsInterface } from './types'
import { GRAPH_OPTIONS } from 'utils/constants'
import { GRAPH_OPTIONS_TYPE } from 'utils/types'
import { getCurrentMonth, getCurrentYear } from 'utils/helpers'

const initialState: AnalyticsInterface = {
  customer: 0,
  product: 0,
  invoice: 0,
  salesGraph: {
    data: {},
    type: GRAPH_OPTIONS[0],
    month: getCurrentMonth(),
    year: getCurrentYear(),
    loading: false,
  },
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

    setSalesGraphType: (
      state: AnalyticsInterface,
      action: PayloadAction<GRAPH_OPTIONS_TYPE>,
    ) => {
      state.salesGraph.type = action.payload
    },
    setSalesGraphData: (
      state: AnalyticsInterface,
      action: PayloadAction<any>,
    ) => {
      state.salesGraph.data = action.payload
    },
    setSalesGraphMonth: (
      state: AnalyticsInterface,
      action: PayloadAction<string>,
    ) => {
      state.salesGraph.month = action.payload
    },
    setSalesGraphYear: (
      state: AnalyticsInterface,
      action: PayloadAction<number>,
    ) => {
      state.salesGraph.year = action.payload
    },
    setSalesGraphLoading: (
      state: AnalyticsInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.salesGraph.loading = action.payload
    },
  },
})

export const {
  setAnalyticsData,
  updateCount,
  setSalesGraphType,
  setSalesGraphData,
  setSalesGraphMonth,
  setSalesGraphYear,
  setSalesGraphLoading,
} = analyticsSlice.actions

export const selectAnalyticsState = (state: RootState) => state.analytics

export default analyticsSlice.reducer
