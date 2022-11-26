import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => (
  <Box
    sx={{
      width: '100%',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <CircularProgress size={80} />
  </Box>
)

export default Loader
