import { useState, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { GRAPH_OPTIONS } from 'utils/constants'
import { useAppSelector, useAppDispatch } from 'redux-store/hooks'
import {
  selectAnalyticsState,
  setSalesGraphType,
} from 'redux-store/analytics.slice'
import { GRAPH_OPTIONS_TYPE } from 'utils/types'

const Label = () => {
  const { salesGraph } = useAppSelector(selectAnalyticsState)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChange = async (item: GRAPH_OPTIONS_TYPE) => [
    dispatch(setSalesGraphType(item)),
    handleClose(),
  ]

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{ color: 'white', fontSize: '16px', textTransform: 'unset' }}
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
      >
        {salesGraph.type.label}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {GRAPH_OPTIONS.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => {
              handleChange(item)
            }}
            sx={{ width: '150px' }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default Label
