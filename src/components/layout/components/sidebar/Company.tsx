import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import styles from './styles'
import Typography from '@mui/material/Typography'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import { useSession } from 'next-auth/react'
import { shortenCompany } from 'utils/helpers'

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { data: session } = useSession()
  const user: any = session?.user

  const [company, setCompany] = React.useState(user?.company?.name || '')

  const list = ['Test Company', 'First Company', 'Second Company']

  return (
    <Box sx={styles.companyContainer}>
      <Box onClick={handleClick} sx={styles.companyInfo}>
        <Box>
          <Box sx={{ marginBottom: '5px' }}>
            <Typography variant="caption" gutterBottom sx={styles.company}>
              {shortenCompany(company)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" gutterBottom sx={styles.tier}>
              Your tier: Premium
            </Typography>
          </Box>
        </Box>

        <Box>
          <UnfoldMoreIcon sx={{ color: 'rgb(160, 174, 192)' }} />
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ marginTop: '30px', width: '200px' }}
      >
        {list.map((item) => (
          <MenuItem
            onClick={() => setCompany(item)}
            key={item}
            sx={styles.menuList}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
