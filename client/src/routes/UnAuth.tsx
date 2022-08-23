import { ROUTES } from 'utils/constants'
import { useAppSelector } from 'redux-store/hooks'
import { selectAuthState } from 'redux-store/auth.slice'
import { useLocation, Navigate } from 'react-router-dom'

const UnAuthRoute = ({ children }: { children: JSX.Element }) => {
  const { isLogged } = useAppSelector(selectAuthState)
  let location = useLocation()

  if (isLogged) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.DASHBOARD} state={{ from: location }} replace />
  }

  return children
}

export default UnAuthRoute
