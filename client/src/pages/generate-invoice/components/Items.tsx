import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Naira } from 'utils/constants'
import styles from '../styles'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import Autocomplete from '@mui/material/Autocomplete'
import {
  selectInvoiceState,
  addNewInvoiceItem,
  deleteInvoiceItem,
  updateInvoiceItem,
} from 'redux-store/invoice.slice'
import { selectProductState } from 'redux-store/products.slice'
import {
  getPriceOfTotalItem,
  getTotalPriceOfAllItemsSelected,
  removeSelectedProductsFromTotalProducts,
} from '../helpers'
import { SingleProductInterface } from 'redux-store/types'

const Invoice = () => {
  const dispatch = useAppDispatch()
  const { newInvoice } = useAppSelector(selectInvoiceState)
  const { products } = useAppSelector(selectProductState)

  const addNewItem = () => {
    dispatch(addNewInvoiceItem(null))
  }

  const deleteItem = (index: number) => {
    dispatch(deleteInvoiceItem(index))
  }

  const onHandleChangeItem = (index: number, name: string, payload: any) => {
    dispatch(updateInvoiceItem({ index, name, payload }))
  }

  const getProduct = (name: string | null): SingleProductInterface | null => {
    if (name !== null) {
      return products.find((product) => product.name === name) || products[0]
    }

    return null
  }

  const autoCompleteOptions = removeSelectedProductsFromTotalProducts(
    newInvoice.items,
    products,
  )

  return (
    <Box>
      <Box sx={styles.items}>
        {newInvoice.items.map((item, index) => {
          return (
            <Grid container spacing={2} key={index}>
              <Grid item xs={newInvoice.items.length > 1 ? 5 : 6}>
                <Autocomplete
                  options={autoCompleteOptions}
                  autoHighlight
                  autoSelect
                  clearOnBlur
                  clearOnEscape
                  selectOnFocus
                  value={
                    !item.name
                      ? null
                      : products.find((product) => product.name === item.name)
                  }
                  onChange={(event, value) => {
                    onHandleChangeItem(index, 'name', value?.name)
                    onHandleChangeItem(index, 'productId', value?.id)
                    onHandleChangeItem(index, 'price', value?.sellingprice)
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  sx={{ ...styles.halfField, marginTop: '10px' }}
                  getOptionLabel={(option) => option?.name || ''}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={option.image}
                        srcSet={option.image}
                        alt=""
                      />
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Item"
                      inputProps={{
                        ...params.inputProps,
                      }}
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Qty"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  name="qty"
                  type="number"
                  fullWidth
                  required
                  sx={styles.halfField}
                  InputLabelProps={{
                    style: { color: 'rgb(151, 161, 186)' },
                  }}
                  value={item.qty}
                  onChange={(event) =>
                    onHandleChangeItem(index, 'qty', event.target.value)
                  }
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Price"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  name="price"
                  type="number"
                  fullWidth
                  required
                  disabled
                  sx={styles.halfField}
                  InputLabelProps={{
                    style: { color: 'rgb(151, 161, 186)' },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ color: 'white' }}>{Naira}</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={item.price}
                  onChange={(event) =>
                    onHandleChangeItem(index, 'price', event.target.value)
                  }
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Total"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  name="name"
                  type="text"
                  fullWidth
                  disabled
                  sx={styles.halfField}
                  InputLabelProps={{
                    style: { color: 'rgb(151, 161, 186)' },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ color: 'white' }}>{Naira}</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={getPriceOfTotalItem(item.qty, getProduct(item?.name))}
                />
              </Grid>

              {newInvoice.items.length > 1 && (
                <Grid item xs={1}>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    sx={{ marginTop: '8px' }}
                    onClick={() => deleteItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          )
        })}
      </Box>

      <Box
        sx={{
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addNewItem}>
          Add Item
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'rgb(151, 161, 186)', marginRight: '10px' }}>
            Total
          </Typography>

          <Typography sx={{ color: 'white', fontSize: '18px' }}>
            {getTotalPriceOfAllItemsSelected(newInvoice.items)}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Invoice
