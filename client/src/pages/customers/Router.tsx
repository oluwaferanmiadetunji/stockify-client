import { useNavigate } from 'react-router-dom'

const WithRouter = (Component: any) => {
  const Wrapper = (props: JSX.IntrinsicAttributes) => {
    const navigate = useNavigate()

    return <Component navigate={navigate} {...props} />
  }

  return Wrapper
}

export default WithRouter
