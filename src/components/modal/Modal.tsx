import { Fragment, ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import styles from './styles'
import Typography from '@mui/material/Typography'

export default function FormDialog({
  children,
  header,
  setOpen,
  open,
}: {
  children: ReactNode
  header: string
  open: boolean
  setOpen: any
}) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={styles.container}
        PaperComponent={Box}
      >
        <Box sx={styles.card}>
          <Typography sx={styles.header}>{header}</Typography>

          <Box>{children}</Box>
        </Box>
      </Dialog>
    </Fragment>
  )
}
