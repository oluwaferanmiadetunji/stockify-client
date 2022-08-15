import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(ROUTES.LOGIN)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div />
}

export default Home
