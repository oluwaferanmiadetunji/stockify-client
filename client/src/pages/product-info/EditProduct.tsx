import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import styles from './styles'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAppDispatch } from 'redux-store/hooks'
import { makeUpdateProductRequest } from 'api/products'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { Naira } from 'utils/constants'
import Typography from '@mui/material/Typography'
import { selectOptions } from './constants'

export default function EditProduct({ initialState, update }: any) {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  
  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setLoading(true)
    const response = await makeUpdateProductRequest(state?.id, state, dispatch)
    setState(response)
    update(response)
    setLoading(false)
    handleClose()
  }

  return (
    <div>
      <MenuItem onClick={handleClickOpen} disableRipple sx={styles.menuItem}>
        <EditIcon sx={styles.menuIcon} />
        Edit
      </MenuItem>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            onSubmit={onSubmit}
            autoComplete="on"
          >
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Product name"
              type="text"
              fullWidth
              required
              variant="standard"
              value={state.name}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            <TextField
              margin="dense"
              name="costprice"
              label="Product Cost Price"
              type="number"
              fullWidth
              variant="standard"
              value={state.costprice}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: 'black' }}>{Naira}</Typography>
                  </InputAdornment>
                ),
              }}
              required
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            <TextField
              margin="dense"
              name="sellingprice"
              label="Product Selling Price"
              type="number"
              fullWidth
              variant="standard"
              value={state.sellingprice}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: 'black' }}>{Naira}</Typography>
                  </InputAdornment>
                ),
              }}
              required
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />

            <TextField
              margin="dense"
              name="quantity"
              label="Product Quantity"
              type="number"
              fullWidth
              variant="standard"
              value={state.quantity}
              required
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            <TextField
              margin="dense"
              name="supplier"
              label="Product Supplier"
              type="text"
              required
              fullWidth
              variant="standard"
              value={state.supplier}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            <TextField
              margin="dense"
              name="manufacturer"
              label="Product Manufacturer"
              type="text"
              required
              fullWidth
              variant="standard"
              value={state.manufacturer}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            <TextField
              margin="dense"
              name="serial_number"
              label="Serial Number"
              type="text"
              required
              fullWidth
              variant="standard"
              value={state.serial_number}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
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
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
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
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
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
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            <TextField
              margin="dense"
              name="size"
              label="Product size (in inches)"
              type="text"
              fullWidth
              required
              variant="standard"
              value={state.size}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
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
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />
            {/* <TextField
              margin="dense"
              name="color"
              label="Color"
              type="text"
              fullWidth
              required
              variant="standard"
              value={state.color}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            /> */}
            <TextField
              margin="dense"
              name="battery_health"
              label="Battery Health"
              type="text"
              fullWidth
              variant="standard"
              value={state.battery_health}
              onChange={handleChange}
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            />

            <TextField
              name="fingerprint"
              select
              label="Fingerprint"
              value={state.fingerprint}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Finger print enabled?"
              variant="standard"
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            >
              {selectOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <TextField
              name="touch"
              select
              label="Touch"
              value={state.touch}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Touch enabled?"
              variant="standard"
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            >
              {selectOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <TextField
              name="dedicated"
              select
              label="Dedicated Memory"
              value={state.dedicated}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Dedicated memory enabled?"
              variant="standard"
              sx={styles.textfield}
              InputLabelProps={{
                style: { color: 'rgb(151, 161, 186)' },
              }}
            >
              {selectOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
