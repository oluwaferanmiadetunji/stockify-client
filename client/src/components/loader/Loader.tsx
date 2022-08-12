import GridLoader from 'react-spinners/GridLoader'
import Box from '@mui/material/Box'
import styles from './styles'

const Loader = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <GridLoader color="blue" size={30} />
    </Box>
  )
}

export default Loader
