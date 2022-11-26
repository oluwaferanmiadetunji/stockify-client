import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Company from './Company'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PeopleIcon from '@mui/icons-material/People'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'
import { ROUTES, ROLES } from 'utils/constant'
import styles from './styles'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import GroupIcon from '@mui/icons-material/Group'

const NavigationLink = ({
  href,
  text,
  icon,
}: {
  href: string
  text: string
  icon: any
}) => {
  const router = useRouter()

  const isActive =
    router.asPath === href || href.split('/')[1] === router.asPath.split('/')[1]

  return (
    <ListItemButton
      key={text}
      sx={isActive ? styles.activeLink : styles.link}
      component={Link}
      href={href}
    >
      <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 'bold',
          marginLeft: '-20px',
        }}
      />
    </ListItemButton>
  )
}

const Sidebar = () => {
  const { data: session, status } = useSession()
  const user: any = session?.user
  const company: any = session?.user?.company

  return (
    <Paper sx={styles.container}>
      <Toolbar sx={styles.toolbar}>
        <Link href={ROUTES.HOME}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            Stockify
          </Typography>
        </Link>
      </Toolbar>

      {company && <Company />}

      <List component="nav" sx={styles.list}>
        <NavigationLink
          href={ROUTES.DASHBOARD}
          icon={<HomeIcon />}
          text={'Dashboard'}
        />

        <NavigationLink
          href={ROUTES.CUSTOMERS}
          icon={<PeopleIcon />}
          text={'Customers'}
        />

        <NavigationLink
          href={ROUTES.PRODUCTS}
          icon={<ShoppingBagIcon />}
          text={'Products'}
        />

        <NavigationLink
          href={ROUTES.INVOICES}
          icon={<ReceiptIcon />}
          text={'Invoices'}
        />

        {user?.user?.role === ROLES.ADMIN && (
          <NavigationLink
            href={ROUTES.USERS}
            icon={<GroupIcon />}
            text={'Users'}
          />
        )}
      </List>
    </Paper>
  )
}

export default Sidebar
