import { useState } from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
// import Badge from '@mui/material/Badge'
// import NotificationsIcon from '@mui/icons-material/Notifications'
import styles from './styles'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import Paper from '@mui/material/Paper'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuList from '@mui/material/MenuList'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { signOut, useSession } from 'next-auth/react'
import { ROUTES, drawerWidth } from 'utils/constant'
import Person2Icon from '@mui/icons-material/Person2'
import axios from 'axios'
import { useRouter } from 'next/router'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}))

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const router = useRouter()

  const { data: session } = useSession()
  //@ts-ignore
  const token = session?.accessToken || ''

  const settings = [
    {
      label: 'Profile',
      onClick: async () => {
        router.push(ROUTES.PROFILE)
      },
      icon: <Person2Icon fontSize="small" />,
    },
    {
      label: 'Logout',
      onClick: async () => {
        handleCloseUserMenu()
        await axios.delete('auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        signOut({
          callbackUrl: ROUTES.HOME,
        })
      },
      icon: <LogoutIcon fontSize="small" />,
    },
  ]

  return (
    <AppBar position="absolute">
      <Toolbar sx={styles.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={styles.flex}
        />

        {/* <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        <Box sx={styles.right}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <PersonIcon color="secondary" fontSize="large" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={styles.menu}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Paper sx={styles.menuList} elevation={0}>
              {settings.map((setting) => (
                <MenuList key={setting.label}>
                  <MenuItem onClick={setting.onClick}>
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <ListItemText>{setting.label}</ListItemText>
                  </MenuItem>
                </MenuList>
              ))}
            </Paper>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
