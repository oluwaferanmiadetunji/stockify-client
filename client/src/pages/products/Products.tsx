import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import { initialState } from './constants'
import { storage } from 'utils/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toast'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { generateImageTag } from 'utils/helpers'
import Layout from 'components/layout'
import Typography from '@mui/material/Typography'
import InventoryIcon from '@mui/icons-material/Inventory'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaidIcon from '@mui/icons-material/Paid'
import styles, { Item, StyledTableCell, StyledTableRow } from './styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DialogContentText from '@mui/material/DialogContentText'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import { selectProductState } from 'redux-store/products.slice'
import {
  makeAddNewProductRequest,
  makeProductsQueryRequest,
  makeDeleteProductRequest,
} from 'utils/api'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

const Products = () => {
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [file, setFile] = useState<any>('')
  const [percent, setPercent] = useState(0)
  const [state, setState] = useState(initialState)
  const dispatch = useAppDispatch()
  const { products, count } = useAppSelector(selectProductState)
  const [id, setId] = useState('')

  const handleFileChange = async (event: any): Promise<any> => {
    setFile(event.target.files[0])
    setImageLoading(true)
    const storageRef = ref(storage, generateImageTag())
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )

        // update progress
        setPercent(percent)
      },
      (err) => {
        toast.error('Error updating product image!')
        return null
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setState({
            ...state,
            image: url,
          })
        })
      },
    )
    setImageLoading(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const disabled = loading || !state.image

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault()

    setLoading(true)

    await makeAddNewProductRequest(state, dispatch, handleClose)
    setLoading(false)
  }

  const onDelete = async () => {
    setLoading(true)
    await makeDeleteProductRequest(id, dispatch)
    setDeleteOpen(false)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      await makeProductsQueryRequest('limit=1000', dispatch)
    })()
  }, [dispatch])

  return (
    <div>
      <Layout>
        <Box sx={styles.header}>
          <Typography
            variant="h5"
            sx={styles.headerText}
            gutterBottom
            component="div"
          >
            Products
          </Typography>

          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              New
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>Add New Product</DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                  }}
                  autoComplete="on"
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Product name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.name}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="price"
                    label="Product Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={state.price}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₦</InputAdornment>
                      ),
                    }}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="supplier"
                    label="Product Supplier"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.supplier}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="manufacturer"
                    label="Product Manufacturer"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.manufacturer}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="serial_number"
                    label="Serial Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.serial_number}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="RAM"
                    label="Specification (RAM)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.RAM}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="ROM"
                    label="Specification (ROM)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.ROM}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="processor"
                    label="Processor Type"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.processor}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="size"
                    label="Product size (in inches)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.size}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="imei"
                    label="IMEI number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.imei}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="color"
                    label="Color"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.color}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="battery_health"
                    label="Battery Health"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={state.battery_health}
                    onChange={handleChange}
                  />

                  <Button
                    variant="contained"
                    component="label"
                    disabled={imageLoading}
                  >
                    {imageLoading ? `${percent} % done` : 'Upload Image'}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                </Box>
              </DialogContent>

              <DialogActions sx={{ marginTop: '10px' }}>
                <Button onClick={handleClose} color="error">
                  Cancel
                </Button>

                <LoadingButton
                  loading={loading}
                  onClick={onSubmit}
                  disabled={disabled}
                  variant="contained"
                  type="button"
                >
                  Submit
                </LoadingButton>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>

        <Box sx={styles.container}>
          <Item
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={styles.card}>
              <InventoryIcon />

              <Box sx={{ marginLeft: '30px' }}>
                <Typography
                  variant="h5"
                  sx={styles.cardLabel}
                  gutterBottom
                  component="div"
                >
                  TOTAL STOCK
                </Typography>

                <Typography
                  variant="h5"
                  sx={styles.cardValue}
                  gutterBottom
                  component="div"
                >
                  {count}
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.card}>
              <PaidIcon />

              <Box sx={{ marginLeft: '30px' }}>
                <Typography
                  variant="h5"
                  sx={styles.cardLabel}
                  gutterBottom
                  component="div"
                >
                  RETAIL VALUE
                </Typography>

                <Typography
                  variant="h5"
                  sx={styles.cardValue}
                  gutterBottom
                  component="div"
                >
                  $ 25,200.00
                </Typography>
              </Box>
            </Box>

            <Box sx={{ ...styles.card, borderRight: 'unset' }}>
              <ShoppingCartIcon />

              <Box sx={{ marginLeft: '30px' }}>
                <Typography
                  variant="h5"
                  sx={styles.cardLabel}
                  gutterBottom
                  component="div"
                >
                  UNREALIZED PROFIT
                </Typography>

                <Typography
                  variant="h5"
                  sx={styles.cardValue}
                  gutterBottom
                  component="div"
                >
                  $ 8,250.00
                </Typography>
              </Box>
            </Box>
          </Item>

          <Item sx={{ padding: '20px' }}>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Color</StyledTableCell>
                    <StyledTableCell>Size</StyledTableCell>
                    <StyledTableCell>Created</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={row.image} />
                          </ListItemAvatar>
                          <ListItemText primary={row.name} />
                        </ListItem>
                      </StyledTableCell>
                      <StyledTableCell>₦ {row.price}</StyledTableCell>
                      <StyledTableCell>{row.color}</StyledTableCell>
                      <StyledTableCell>{row.size}</StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row.createdAt).format('MMM D, YYYY')}
                      </StyledTableCell>
                      <StyledTableCell>
                        <DeleteIcon
                          color="error"
                          onClick={() => {
                            setId(row.id)
                            setDeleteOpen(true)
                          }}
                          sx={styles.deleteButton}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

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
                <Button color="info" onClick={() => setDeleteOpen(false)}>
                  Disagree
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
          </Item>
        </Box>
      </Layout>
    </div>
  )
}

export default Products
