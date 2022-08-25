import { useState, MouseEvent } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles from './styles'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { StyledMenu } from './styled'
import EditCustomer from './EditCustomer'

const CustomerInfo = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={RouterLink}
            to={ROUTES.CUSTOMERS}
          >
            Customers
          </Button>

          <Box>
            <Button
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={styles.menuButton}
            >
              Actions
            </Button>

            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <EditCustomer />

              <MenuItem
                onClick={handleClose}
                sx={styles.menuItem}
                disableRipple
              >
                <DeleteIcon sx={styles.menuIcon} />
                Delete
              </MenuItem>
            </StyledMenu>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default CustomerInfo
