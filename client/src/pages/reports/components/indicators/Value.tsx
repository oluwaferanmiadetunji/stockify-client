import { useState, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { generateYears, getCurrentYear } from 'utils/helpers'

const Year = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [year, setYear] = useState(getCurrentYear())

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{ color: 'white', fontSize: '16px' }}
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
      >
        {year}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {generateYears().map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              setYear(item)
              handleClose()
            }}
            sx={{ width: '150px' }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default Year
