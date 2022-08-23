import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { ProductState } from './types'

const initialState: ProductState = {
  products: [],
  page: 1,
  limit: 100,
  totalPages: 0,
  count: 0,
}

const authSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state: ProductState, action: PayloadAction<ProductState>) => {
      state.products = action.payload.products
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.totalPages = action.payload.totalPages
      state.count = action.payload.count
    },

    addProducts: (state: ProductState, action: PayloadAction<any>) => {
      state.products = [action.payload, ...state.products]
      state.count = state.count + 1
    },
    deleteProduct: (state: ProductState, action: PayloadAction<any>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload,
      )
      state.products.splice(index, 1)
      state.count = state.count - 1
    },
  },
})

export const { setProducts, addProducts, deleteProduct } = authSlice.actions

export const selectProductState = (state: RootState) => state.products

export default authSlice.reducer
