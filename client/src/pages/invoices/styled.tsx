import { Theme, styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { classes } from './constants'

export const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(30, 33, 42)',
  ...theme.typography.body2,
  padding: '10px 20px',
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
}))

export const Card = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgba(22, 100, 216, 0.1)',
  ...theme.typography.body2,
  padding: '30px',
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '200px',
}))

export const MuiStyles = ({ theme }: { theme: Theme }) =>
  ({
    '& .ReactVirtualized__Table__headerRow': {
      ...(theme.direction === 'rtl' && {
        paddingLeft: '0 !important',
      }),
      ...(theme.direction !== 'rtl' && {
        paddingRight: undefined,
      }),
    },
    [`& .${classes.flexContainer}`]: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    [`& .${classes.tableRow}`]: {
      cursor: 'pointer',
    },
    [`& .${classes.tableRowHover}`]: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    [`& .${classes.tableCell}`]: {
      flex: 1,
    },
    [`& .${classes.noClick}`]: {
      cursor: 'initial',
    },
  } as const)
