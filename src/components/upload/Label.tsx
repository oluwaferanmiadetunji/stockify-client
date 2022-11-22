import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const CircularProgressWithLabel = (props: any) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        size={80}
        variant="determinate"
        thickness={2}
        sx={{
          '&.MuiCircularProgress-colorPrimary': {
            color: props.value < 100 ? 'primary.700' : 'success.600',
          },
        }}
        {...props}
      />
      <Box // Progress Label
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'gray.900',
          }}
        >
          {`${props.value}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel
