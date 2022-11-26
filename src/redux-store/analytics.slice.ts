import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { AnalyticsInterface } from './types'
import { GRAPH_OPTIONS } from 'utils/constant'
import { GRAPH_OPTIONS_TYPE } from 'utils/types'
import { getCurrentMonth, getCurrentYear } from 'utils/helpers'

const initialState: AnalyticsInterface = {
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
  setSalesGraphType,
  setSalesGraphData,
  setSalesGraphMonth,
  setSalesGraphYear,
  setSalesGraphLoading,
} = analyticsSlice.actions

export const selectAnalyticsState = (state: RootState) => state.analytics

export default analyticsSlice.reducer
