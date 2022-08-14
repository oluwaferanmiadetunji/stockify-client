import axios from 'axios'
import { API_ROUTES, ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import { login } from 'redux-store/auth.slice'
import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'
import { NavigateFunction } from 'react-router-dom'

interface MakeLoginRequestInterface {
  email: string
  password: string
}
export const makeLoginRequest = async (
  payload: MakeLoginRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  try {
    const response = await axios.post(API_ROUTES.LOGIN, payload)
    toast.success(response.data.message)
    dispatch(login({ token: response.data.token, user: response.data.user }))
    navigate(ROUTES.DASHBOARD)
  } catch (err) {
    //@ts-ignore
    toast.error(err.response.data.message)
  }
}
