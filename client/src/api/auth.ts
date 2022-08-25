import axios from 'axios'
import { API_ROUTES } from 'utils/constants'
import { toast } from 'react-toast'
import { login } from 'redux-store/auth.slice'
import { EmptyObject, AnyAction, Dispatch } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AuthState } from 'redux-store/types'
import { ThunkDispatch } from 'redux-thunk'
import { saveToken } from 'utils/helpers'
import { MakeLoginRequestInterface } from './types'

export const makeLoginRequest = async (
  payload: MakeLoginRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & { auth: AuthState } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void,
) => {
  try {
    const response = await axios.post(API_ROUTES.LOGIN, payload)
    toast.success(response.data.message)
    saveToken(response.data.token)

    dispatch(login({ token: response.data.token, user: response.data.user }))
    callback()
  } catch (err) {
    //@ts-ignore
    toast.error('Error logging in')
  }
}
