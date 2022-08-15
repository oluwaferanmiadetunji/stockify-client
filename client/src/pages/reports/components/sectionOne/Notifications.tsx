import Typography from '@mui/material/Typography'
import styles from './styles'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Notifications = ({ text, icon }: any) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <ArrowForwardIcon sx={{ color: 'rgb(151, 161, 186)' }} />
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          sx={{ color: 'white' }}
          secondary={<Typography sx={styles.notifText}>{text}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default Notifications
