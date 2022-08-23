import { ROUTES } from 'utils/constants'
import { useAppSelector, useAppDispatch } from 'redux-store/hooks'
import { selectAuthState, logout } from 'redux-store/auth.slice'
import { useLocation, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { saveToken } from 'utils/helpers'

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { isLogged, token } = useAppSelector(selectAuthState)
  const dispatch = useAppDispatch()
  let location = useLocation()

  if (!isLogged) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  const decodedToken: any = jwtDecode(token)

  if (decodedToken.exp * 1000 < Date.now()) {
    dispatch(logout())
    window.location.href = ROUTES.LOGIN
  } else {
    saveToken(token)
  }

  return children
}

export default AuthRoute
