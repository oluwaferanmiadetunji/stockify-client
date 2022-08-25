import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { useAppDispatch } from 'redux-store/hooks'
import styles from './styles'
import DialogContentText from '@mui/material/DialogContentText'
import DeleteIcon from '@mui/icons-material/Delete'
import { makeDeleteProductRequest } from 'api/products'

const Products = ({ product }: any) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const onDelete = async () => {
    setLoading(true)
    await makeDeleteProductRequest(
      { id: product.id, price: product.price },
      dispatch,
    )
    setDeleteOpen(false)
    setLoading(false)
  }

  return (
    <Box>
      <DeleteIcon
        color="error"
        onClick={() => {
          setDeleteOpen(true)
        }}
        sx={styles.deleteButton}
      />

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{'Delete this product'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible and can not be recovered
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} color="primary">
            Cancel
          </Button>

          <LoadingButton
            loading={loading}
            onClick={onDelete}
            variant="contained"
            color="error"
            sx={{ marginLeft: '10px' }}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Products
