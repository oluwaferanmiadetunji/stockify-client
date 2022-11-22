import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CancelButton } from 'components/buttons'

const UploadedImage = ({ url, onDelete }: any) => (
  <Box
    sx={{ border: '1px dotted white', borderRadius: '10px', padding: '20px' }}
  >
    <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
      <Typography variant="body2" sx={{ color: 'white', marginBottom: '20px' }}>
        Image Uploaded successfully
      </Typography>

      <CancelButton text="Delete Image" onClick={onDelete} />
    </Box>
  </Box>
)

export default UploadedImage
