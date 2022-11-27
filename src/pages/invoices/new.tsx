/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import RouterLink from 'next/link'
import Button from '@mui/material/Button'
import { ROUTES, Naira } from 'utils/constant'
import { generateRandomString, renderPrice } from 'utils/helpers'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Divider from '@mui/material/Divider'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomInput from 'components/input'
import { CancelButton, DarkContainedButton } from 'components/buttons'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { toast } from 'react-toastify'

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
    padding: '10px 30px 30px 30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  back: {
    color: 'rgb(182, 146, 246)',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
  },
  headerText: {
    color: 'white',
    fontSize: '22px',
    marginTop: '10px',
  },
  formContainer: {
    marginTop: '30px',
    backgroundColor: 'rgb(17, 24, 39)',
    padding: '30px',
    borderRadius: '10px',
  },
  halfField: {
    width: '100%',
    input: {
      color: 'white',
    },
    select: {
      color: 'white',
    },
    marginBottom: '25px',
    textarea: { color: 'white' },
  },
  divider: {
    bgcolor: 'white',
    width: '100%',
  },
  items: {
    marginTop: '10px',
  },
  addButton: {
    marginBottom: '20px',
  },
  item: {},
  createButton: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right',
    width: '100%',
  },
}

const removeSelectedProductsFromTotalProducts = (
  selectedProducts: any[],
  totalProducts: any[],
) => {
  if (selectedProducts.length === 0 || selectedProducts[0].name === '') {
    return totalProducts
  }

  const filteredArray = totalProducts
    .filter((product) => product.qty > 0)
    .filter(
      (product) =>
        !selectedProducts.find((selected) => selected.productId === product.id),
    )

  return filteredArray
}

const GenerateInvoice = (props: any) => {
  const Router = useRouter()
  const singleItem = { name: null, qty: 1, price: 0, productId: null }

  const initialState = {
    _id: generateRandomString(),
    subject: '',
    customer: '',
    issuedDate: dayjs(new Date().toISOString()),
    dueDate: dayjs(new Date().setDate(new Date().getDate() + 10)),
    items: [singleItem],
    notes: '',
  }
  const [state, setState] = useState(initialState)

  const [loading, setLoading] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const onClear = () => {
    setLoading(false)
    setState(initialState)
    Router.push(ROUTES.INVOICES)
  }

  const products: any[] = props.products

  const addNewItem = () => {
    setState({
      ...state,
      items: [...state.items, singleItem],
    })
  }

  const deleteItem = (index: number) => {
    let items = [...state.items]
    items.splice(index, 1)

    setState({
      ...state,
      items,
    })
  }

  const setProduct = (index: number, value: any) => {
    let items = [...state.items]
    items[index] = {
      name: value.name,
      qty: 1,
      productId: value.id,
      price: value.sellPrice,
    }

    setState({
      ...state,
      items,
    })
  }

  const updateQty = (index: number, value: number) => {
    let newValue = value

    if (value < 1) {
      newValue = 0
    }

    let items = [...state.items]
    items[index] = {
      ...items[index],
      qty: newValue,
    }

    setState({
      ...state,
      items,
    })
  }

  const onHandleChangeItem = (index: number, name: string, payload: any) => {
    let modifiedItems = [...state.items]

    modifiedItems[index] = {
      ...modifiedItems[index],
      [name]: payload,
    }

    setState({
      ...state,
      items: modifiedItems,
    })
  }

  const autoCompleteOptions = removeSelectedProductsFromTotalProducts(
    state.items,
    products,
  )

  const formatPayload = (state: any) => {
    let response = { ...state }
    const items = []

    for (let i = 0; i < response.items.length; i++) {
      items.push({
        productId: response.items[i].productId,
        qty: response.items[i].qty,
      })
    }

    response.items = items

    return response
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('invoices', formatPayload(state), {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      setState(initialState)
      toast.success('Invoice generated successfully')
      Router.push(`${ROUTES.INVOICES}/${response.data.data.id}`)
    } catch (error) {
      toast.error('Error generating invoice')
    } finally {
      setLoading(false)
    }
  }

  const getTotalPrice = () => {
    let sum = 0
    for (let i = 0; i < state.items.length; i++) {
      sum += state.items[i].qty * state.items[i].price
    }
    return renderPrice(sum)
  }

  const disabled =
    !state.subject || !state.customer || state.items[0].name == null

  return (
    <Layout title="Generate Invoice">
      <Box sx={styles.container}>
        <Button
          variant="text"
          startIcon={<KeyboardBackspaceIcon />}
          sx={{
            color: 'white',
            textTransform: 'unset',
            fontSize: '16px',
            borderRadisu: '5px',
            marginBottom: '30px',
          }}
          component={RouterLink}
          href={ROUTES.INVOICES}
        >
          Invoices
        </Button>

        <Typography sx={styles.headerText}>Generate Invoice</Typography>

        <Box
          component="form"
          sx={styles.formContainer}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CustomInput
                handleChange={onChange}
                label="Subject"
                name="subject"
                value={state.subject}
                multiline
                rows={6}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                handleChange={onChange}
                label="Invoice Number"
                name="_id"
                value={state._id}
                disabled
              />

              <CustomInput
                handleChange={onChange}
                label="Customer"
                name="customer"
                value={state.customer}
                autoComplete="name"
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Issued Date"
                  inputFormat="MM/DD/YYYY"
                  value={state.issuedDate}
                  disabled
                  onChange={() => {}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      sx={styles.halfField}
                      InputLabelProps={{
                        style: { color: 'rgb(151, 161, 186)' },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Due Date"
                  inputFormat="MM/DD/YYYY"
                  value={state.dueDate}
                  onChange={(newValue: Dayjs | null) => {
                    setState({
                      ...state,
                      dueDate:
                        newValue === null
                          ? dayjs(new Date().setDate(new Date().getDate() + 10))
                          : newValue,
                    })
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      sx={styles.halfField}
                      InputLabelProps={{
                        style: { color: 'rgb(151, 161, 186)' },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Divider sx={styles.divider} />

          <Box>
            <Box sx={styles.items}>
              {state?.items?.map((item: any, index: any) => {
                return (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={state?.items?.length > 1 ? 5 : 6}>
                      <Autocomplete
                        options={autoCompleteOptions}
                        autoHighlight
                        autoSelect
                        clearOnBlur={false}
                        clearOnEscape
                        selectOnFocus
                        value={
                          !item.name
                            ? null
                            : products.find(
                                (product) => product.name === item.name,
                              )
                        }
                        onChange={(event, value) => setProduct(index, value)}
                        isOptionEqualToValue={(option, value) => {
                          return option.name === value.name
                        }}
                        sx={{ ...styles.halfField, marginTop: '10px' }}
                        getOptionLabel={(option) => option?.name || ''}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{
                              '& > img': { mr: 2, flexShrink: 0 },
                              color: 'black',
                            }}
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
                          updateQty(index, Number(event.target.value))
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
                              <Typography sx={{ color: 'white' }}>
                                {Naira}
                              </Typography>
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
                              <Typography sx={{ color: 'white' }}>
                                {Naira}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                        value={renderPrice(item.qty * item.price)}
                      />
                    </Grid>

                    {state?.items?.length > 1 && (
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
              {state.items[state.items.length - 1].name == null ? (
                <Typography></Typography>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addNewItem}
                  sx={{
                    color: 'white',
                    textTransform: 'unset',
                    '&:hover': { color: 'white' },
                  }}
                >
                  Add Item
                </Button>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  sx={{ color: 'rgb(151, 161, 186)', marginRight: '10px' }}
                >
                  Total
                </Typography>

                <Typography sx={{ color: 'white', fontSize: '18px' }}>
                  {getTotalPrice()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ ...styles.divider, marginBottom: '20px' }} />

          <TextField
            label="Additional Notes"
            variant="outlined"
            size="small"
            margin="dense"
            name="notes"
            type="text"
            fullWidth
            multiline
            rows={5}
            sx={styles.halfField}
            InputLabelProps={{
              style: { color: 'rgb(151, 161, 186)' },
            }}
            value={state.notes}
            onChange={onChange}
          />

          <Box sx={styles.createButton}>
            <CancelButton text="Cancel" onClick={onClear} />

            <DarkContainedButton
              text="Submit"
              loading={loading}
              onClick={handleSubmit}
              disabled={disabled}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

GenerateInvoice.auth = true

export default GenerateInvoice

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products: any[] = []

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  )

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.SIGNIN,
      },
    }
  }

  // @ts-ignore
  const token = session?.accessToken

  try {
    const response = await axios.get('products?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    products = response?.data?.data?.results
  } catch (error) {
    //@ts-ignore
    console.log(error?.response)
  }

  return {
    props: {
      products,
      token,
    },
  }
}
