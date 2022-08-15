import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(ROUTES.LOGIN)
  }, [navigate])
  return null
}

export default Home
