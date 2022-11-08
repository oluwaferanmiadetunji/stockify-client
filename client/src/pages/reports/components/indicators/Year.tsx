import { useState, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { generateYears } from 'utils/helpers'
import { useAppSelector, useAppDispatch } from 'redux-store/hooks'
import {
  selectAnalyticsState,
  setSalesGraphYear,
} from 'redux-store/analytics.slice'

const Year = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { salesGraph } = useAppSelector(selectAnalyticsState)
  const dispatch = useAppDispatch()

  const handleChange = async (item: number) => {
    dispatch(setSalesGraphYear(item))
    handleClose()
  }

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{ color: 'white', fontSize: '16px', textTransform: 'unset' }}
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
      >
        {salesGraph.year}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {generateYears().map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              handleChange(item)
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
