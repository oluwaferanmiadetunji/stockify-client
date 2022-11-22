import { useRouter } from 'next/router'

const WithRouter = (Component: any) => {
  const Wrapper = (props: JSX.IntrinsicAttributes) => {
    const navigate = useRouter()

    return <Component navigate={navigate} {...props} />
  }

  return Wrapper
}

export default WithRouter
