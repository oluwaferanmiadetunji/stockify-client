import Layout from 'components/layout'
import { useSession } from 'next-auth/react'
import Box from '@mui/material/Box'

const Dashboard = () => {
  const { data: session, status } = useSession()

  return (
    <Layout title="Dashboard">
      <Box>Dashboard</Box>
    </Layout>
  )
}

Dashboard.auth = true

export default Dashboard
