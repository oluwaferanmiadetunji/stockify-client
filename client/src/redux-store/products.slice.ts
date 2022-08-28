import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import {
  ProductState,
  SetProductDataInterface,
  SingleProductInterface,
} from './types'

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  page: 1,
  limit: 100,
  totalPages: 0,
  count: 0,
  totalPrice: 0,
  isFiltered: false,
}

const authSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (
      state: ProductState,
      action: PayloadAction<SetProductDataInterface>,
    ) => {
      state.products = action.payload.products
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.totalPages = action.payload.totalPages
      state.count = action.payload.count
    },
    updatePrice: (
      state: ProductState,
      action: PayloadAction<{ type: 'increase' | 'decrease'; value: number }>,
    ) => {
      state.totalPrice =
        action.payload.type === 'increase'
          ? (state.totalPrice =
              Number(state.totalPrice) + Number(action.payload.value))
          : Number(state.totalPrice) - Number(action.payload.value)
    },
    setProductPrice: (state: ProductState, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
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
    updateProduct: (state: ProductState, action: PayloadAction<any>) => {
      let index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      )
      state.products[index] = action.payload
    },
    setProductsFilter: (
      state: ProductState,
      action: PayloadAction<SingleProductInterface[]>,
    ) => {
      state.filteredProducts = action.payload
      state.isFiltered = true
    },
    cancelProductsFilter: (
      state: ProductState,
      action: PayloadAction<void>,
    ) => {
      state.filteredProducts = []
      state.isFiltered = false
    },
  },
})

export const {
  setProducts,
  addProducts,
  deleteProduct,
  setProductPrice,
  updatePrice,
  updateProduct,cancelProductsFilter,setProductsFilter
} = authSlice.actions

export const selectProductState = (state: RootState) => state.products

export default authSlice.reducer
