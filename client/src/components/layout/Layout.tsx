import Box from '@mui/material/Box'
import Navbar from 'components/navbar'
import styles from './styles'

const Layout = ({ children }: any): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <Navbar />

      <Box>{children}</Box>
    </Box>
  )
}

export default Layout
