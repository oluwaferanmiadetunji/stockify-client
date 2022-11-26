import styles, { BootstrapInput } from './styles'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const CustomInput = ({
  value,
  handleChange,
  label,
  type = 'text',
  autoFocus = false,
  name,
  autoComplete,
  multiline = false,
  rows,
  placeholder,
  startAdornment,
  disabled,
}: {
  value: string | number
  handleChange?: any
  label: string
  type?: string
  autoFocus?: boolean
  name: string
  autoComplete?: string
  multiline?: boolean
  rows?: string | number
  placeholder?: string
  startAdornment?: any
  disabled?: boolean
}) => {
  return (
    <Box sx={styles.formItem}>
      <FormControl variant="standard">
        <InputLabel shrink sx={styles.textFieldLabel}>
          {label}
        </InputLabel>

        <BootstrapInput
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required
          fullWidth
          size="small"
          onChange={handleChange}
          value={value}
          type={type}
          multiline={multiline}
          rows={rows}
          startAdornment={startAdornment}
        />
      </FormControl>
    </Box>
  )
}

export default CustomInput
