import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import { initialState } from './constants'
import { storage } from 'utils/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toast'
import { useAppDispatch } from 'redux-store/hooks'
import { makeAddNewProductRequest } from 'api/products'

const AddProduct = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  const [state, setState] = useState(initialState)
  const dispatch = useAppDispatch()

  const handleFileChange = async (e: any): Promise<any> => {
    console.log(e.target)
    const file = e.target[0]?.files[0]

    setImageLoading(true)

    const storageRef = ref(storage, `files/${file.name}${new Date().getTime()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )

        // update progress
        setPercent(percent)
      },
      (err) => {
        toast.error('Error updating product image!')
        console.log(err)
        return null
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setState({
            ...state,
            image: url,
          })
        })
      },
    )
    setImageLoading(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const disabled = loading || !state.image
  const callback = () => {
    setState(initialState)
    handleClose()
  }
  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault()

    setLoading(true)

    await makeAddNewProductRequest(state, dispatch, callback)
    setLoading(false)
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{ color: 'white', textTransform: 'unset' }}
      >
        Add New Product
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            autoComplete="on"
          >
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Product name"
              type="text"
              fullWidth
              variant="standard"
              value={state.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Product Price"
              type="number"
              fullWidth
              variant="standard"
              value={state.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₦</InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="supplier"
              label="Product Supplier"
              type="text"
              fullWidth
              variant="standard"
              value={state.supplier}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="manufacturer"
              label="Product Manufacturer"
              type="text"
              fullWidth
              variant="standard"
              value={state.manufacturer}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="serial_number"
              label="Serial Number"
              type="text"
              fullWidth
              variant="standard"
              value={state.serial_number}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="RAM"
              label="Specification (RAM)"
              type="text"
              fullWidth
              variant="standard"
              value={state.RAM}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="ROM"
              label="Specification (ROM)"
              type="text"
              fullWidth
              variant="standard"
              value={state.ROM}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="processor"
              label="Processor Type"
              type="text"
              fullWidth
              variant="standard"
              value={state.processor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="size"
              label="Product size (in inches)"
              type="text"
              fullWidth
              variant="standard"
              value={state.size}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="imei"
              label="IMEI number"
              type="text"
              fullWidth
              variant="standard"
              value={state.imei}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="color"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
              value={state.color}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="battery_health"
              label="Battery Health"
              type="text"
              fullWidth
              variant="standard"
              value={state.battery_health}
              onChange={handleChange}
              sx={{ marginBottom: '20px' }}
            />

            <Button
              variant="contained"
              component="label"
              disabled={imageLoading}
            >
              {!state.image && imageLoading
                ? `${percent} % done`
                : 'Upload Image'}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>

            {state.image && (
              <img src={state.image} alt="uploaded file" height={200} />
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ marginTop: '10px' }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>

          <LoadingButton
            loading={loading}
            onClick={onSubmit}
            disabled={disabled}
            variant="contained"
            type="button"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AddProduct
