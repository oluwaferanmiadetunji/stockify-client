import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import styles from './styles'
import { Naira } from 'utils/constants'
import { Typography } from '@mui/material'
import { selectOptions } from './constants'

const AddProduct = ({ handleChange, state }: any) => {
  return (
    <Box>
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
                <Typography sx={{ color: 'white' }}>{Naira}</Typography>
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
                <Typography sx={{ color: 'white' }}>{Naira}</Typography>
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
        <TextField
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
    </Box>
  )
}

export default AddProduct
