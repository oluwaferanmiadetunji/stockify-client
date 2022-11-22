import { useState, Fragment, useEffect } from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import styles, { BootstrapInput } from './styles'
import Typography from '@mui/material/Typography'
import UploadImage from 'components/upload'
import axios from 'axios'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'

export default function FormDialog({
  isOpen = false,
  canCancel = true,
}: {
  isOpen?: boolean
  canCancel?: boolean
}) {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [isCancel, setIsCancel] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setOpen(isOpen)
    setIsCancel(canCancel)
  }, [isOpen, canCancel])

  const handleClose = () => {
    if (isCancel) {
      setOpen(false)
    }
  }

  const [state, setState] = useState({
    name: '',
    image: '',
  })

  const handleChange = (name: string, value: string) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    const response = await axios.post('company', state)
    setLoading(false)

    if (response.status === 201) {
      toast.success(response.data.message)
      router.reload()
    } else {
      toast.error('Unable to create company')
    }
  }

  const setImageURL = (image: string) => {
    setState({
      ...state,
      image,
    })
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={styles.container}
        PaperComponent={Box}
      >
        <Box sx={styles.card}>
          <Typography sx={styles.header}>Create Company</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <Box sx={styles.formItem}>
              <FormControl variant="standard">
                <InputLabel shrink htmlFor="name" sx={styles.textFieldLabel}>
                  Company Name
                </InputLabel>

                <BootstrapInput
                  id="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  required
                  fullWidth
                  size="small"
                  onChange={(event: any) =>
                    handleChange('name', event.target.value)
                  }
                  value={state.name}
                />
              </FormControl>
            </Box>

            <Box sx={styles.formItem}>
              {state.image ? (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Typography>Image Uploaded successfully</Typography>

                  <Button
                    sx={{
                      ml: 3,
                      color: 'red',
                      '&:hover': { color: 'red', background: 'unset' },
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete Image
                  </Button>
                </Box>
              ) : (
                <UploadImage setImageURL={setImageURL} />
              )}
            </Box>

            <Box sx={styles.buttons}>
              {canCancel && (
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{
                    marginRight: '10px',
                    background: 'red',
                    color: 'white',
                    '&:hover': {
                      background: 'red',
                      color: 'white',
                    },
                  }}
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={styles.button}
                disabled={loading || !state.name || !state.image}
              >
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={25} />
                ) : (
                  'Submit'
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Fragment>
  )
}
