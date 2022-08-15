import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { AuthState, LoginInterface } from './types'

const initialState: AuthState = {
  isLogged: false,
  user: {
    email: '',
    blacklisted: false,
    createdAt: '',
    id: '',
    name: '',
  },
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginInterface>) => {
      state.isLogged = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state: AuthState, action: PayloadAction<void>) => {
      state.isLogged = false
      state.token = ''
      state.user = initialState.user
    },
  },
})

export const { login, logout } = authSlice.actions

export const selectAuthState = (state: RootState) => state.auth

export default authSlice.reducer
