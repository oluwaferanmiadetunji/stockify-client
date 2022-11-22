import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import styles from './styles'
import Avatar from '@mui/material/Avatar'

const EmptyData = () => {
  return (
    <Box sx={styles.constainer}>
      <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Avatar
          alt="Remy Sharp"
          src={'/svg/no_data.svg'}
          sx={{ width: 100, height: 100 }}
        />

        <Typography variant="h4" sx={{ color: 'white', marginTop: '10px' }}>
          No Data
        </Typography>
      </Box>
    </Box>
  )
}

export default EmptyData
