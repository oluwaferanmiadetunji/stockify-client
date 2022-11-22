import { LayoutTypes } from './types'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Head from 'next/head'
import styles from './styles'
import Container from '@mui/material/Container'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import { useSession } from 'next-auth/react'
import CreateCompany from 'components/create-company'
import { useState, useEffect } from 'react'

const Layout = ({ children, title }: LayoutTypes) => {
  const { data: session } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (session && !session?.user?.company) {
      setIsOpen(true)
    }
  }, [session, session?.user?.company])

  return (
    <Container disableGutters maxWidth={false} sx={styles.container}>
      <Head>
        <title>{`Stockify - ${title}`}</title>
        <meta
          name="description"
          content="A platform to manage stock, invoices and your products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateCompany isOpen={isOpen} canCancel={false} />

      <Box sx={styles.flex}>
        <Navbar />

        <Sidebar />

        <Box component="main" sx={styles.main}>
          <Toolbar />

          <Container maxWidth="lg" sx={styles.children}>
            {children}
          </Container>
        </Box>
      </Box>
    </Container>
  )
}

export default Layout
