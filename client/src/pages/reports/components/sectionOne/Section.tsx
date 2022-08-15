import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import styles, { Item } from './styles'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import List from '@mui/material/List'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PeopleIcon from '@mui/icons-material/People'
import { generateRandomStrings } from 'utils/helpers'
import Notifications from './Notifications'
import SetupAccount from './SetupAccount'

const SectionOne = () => {
  const notifications = generateRandomStrings(3)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Item>
            <Stack direction="row" spacing={1} sx={styles.header}>
              <Typography sx={styles.headerText}>Notifications</Typography>
            </Stack>

            <Divider sx={styles.divider} />

            <Box sx={{ width: '100%', bgcolor: 'inherit' }}>
              <List>
                {notifications.map((notification, index) => (
                  <>
                    <Notifications
                      key={index}
                      text={notification}
                      icon={<PeopleIcon sx={{ color: 'rgb(151, 161, 186)' }} />}
                    />
                    <Divider sx={styles.divider} />
                  </>
                ))}
              </List>
            </Box>

            <Link to={ROUTES.CUSTOMERS} style={{ textDecoration: 'none' }}>
              <Stack direction="row" spacing={1} sx={styles.bottomItem}>
                <Typography>See all notifications</Typography>
                <ArrowForwardIcon />
              </Stack>
            </Link>
          </Item>
        </Grid>

        <SetupAccount />
        
      </Grid>
    </Box>
  )
}

export default SectionOne
