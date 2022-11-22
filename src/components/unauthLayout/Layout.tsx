import { LayoutTypes } from './types'
import Box from '@mui/material/Box'
import Head from 'next/head'
import styles from './styles'
import Container from '@mui/material/Container'
import Navbar from './Navbar'

const Layout = ({ children, title }: LayoutTypes) => {
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

      <Navbar />

      <Box sx={styles.children}>{children}</Box>
    </Container>
  )
}

export default Layout
