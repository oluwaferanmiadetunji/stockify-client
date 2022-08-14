import Box from '@mui/material/Box'
import Navbar from 'components/navbar'
import Sidebar from 'components/sidebar'
import styles from './styles'

const Layout = ({ children }: any): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <Navbar />

      <Box sx={styles.content}>
        <Sidebar />

        <Box sx={styles.main}>{children}</Box>
      </Box>
    </Box>
  )
}

export default Layout
