import { useEffect, useState } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Input from 'components/input'
import Upload from 'components/upload'
import { Naira, ROUTES } from 'utils/constant'
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import styledComponent from 'styled-components'
import InputLabel from '@mui/material/InputLabel'
import { CancelButton, DarkContainedButton } from 'components/buttons'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Link from 'next/link'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import ImagePlaceholder from 'components/show-image'
import { toast } from 'react-toastify'
import { getBooleanValue, generateRandomString } from 'utils/helpers'
import _ from 'lodash'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const INITIAL_STATE = {
  name: '',
  description: '',
  image: '',
  buyPrice: 0,
  sellPrice: 0,
  category: '',
  qty: 1,
  supplier: '',
  manufacturer: '',
  serialNumber: '',
  RAM: '',
  ROM: '',
  processorType: '',
  size: '',
  imei: '',
  batteryHealth: '',
  isFingerPrint: false,
  isTouch: false,
  dedicatedMemory: false,
  productId: '',
  supplierNumber: '',
  color: '',
  productGroupId: generateRandomString(12),
}
const WhiteBorderTextField = styledComponent(TextField)`
  & label.Mui-focused {
    color: white;
    margin-top: 20px
  }
  & .MuiOutlinedInput-root {
    border-color: white;
    &.Mui-focused fieldset {
      border-color: white;
    }
   
    & fieldset {
      border-color: white;
    }
  }
`

const filter = createFilterOptions<any>()

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(17, 24, 39)',
  ...theme.typography.body2,
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
  padding: '30px',
}))

const selectOptions = [
  { label: 'No', value: false },
  { label: 'Yes', value: true },
]

const CreateNewProduct = (props: any) => {
  const Router = useRouter()
  const [state, setState] = useState([props.initialState])

  const addNewVariation = async () => {
    setState([...state, state[0]])
  }

  const deleteVariation = (index: number) => {
    let newState = [...state]
    newState.splice(index, 1)
    setState(newState)
  }

  const handleChange = (
    index: number,
    name: string,
    value: number | string | boolean,
  ) => {
    let updateState = [...state]
    updateState[index] = {
      ...updateState[index],
      [name]: value,
    }

    setState(updateState)
  }

  const setImageURL = (index: number, image: string) => {
    let newState = [...state]
    newState[index] = {
      ...newState[index],
      image,
    }

    setState(newState)
  }

  const onCancel = () => {
    setState([INITIAL_STATE])
  }

  const onDelete = () => {
    onCancel()
    Router.push(ROUTES.PRODUCTS)
  }

  const parseData = (state: any[]) => {
    return state.map((item) => ({
      ...item,
      qty: Number(item.qty),
      buyPrice: Number(item.buyPrice),
      sellPrice: Number(item.sellPrice),
      isFingerPrint: getBooleanValue(item.isFingerPrint),
      isTouch: getBooleanValue(item.isTouch),
      dedicatedMemory: getBooleanValue(item.dedicatedMemory),
    }))
  }

  const disabled = (): boolean => {
    let disabled = false
    for (let i = 0; i < state.length; i++) {
      const stateItem = state[i]
      if (
        !stateItem.name ||
        !stateItem.description ||
        !stateItem.buyPrice ||
        !stateItem.sellPrice ||
        !stateItem.qty
      ) {
        disabled = true
      }
    }
    return disabled
  }

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await axios.post('products', parseData(state), {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })

      toast.success('Product added successfully')

      setState([props.initialState])
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response.data.message || 'Error adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Products">
      <Box sx={{ padding: '10px 30px 30px 30px' }}>
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
          component={Link}
          href={ROUTES.PRODUCTS}
        >
          Products
        </Button>

        <Typography
          variant="h5"
          sx={{ color: 'white' }}
          gutterBottom
          component="div"
        >
          Create a new product
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          {state.map((item, index) => (
            <>
              {state.length > 1 && (
                <Item
                  sx={{
                    display: 'flex',
                    marginTop: '50px',
                    marginBottom: '-30px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: 'white', fontSize: '18px' }}
                    gutterBottom
                    component="div"
                  >
                    Product {index + 1}
                  </Typography>

                  {index > 0 && (
                    <Button
                      color="error"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        '&:hover': {
                          background: 'red',
                          color: 'white',
                        },
                      }}
                      onClick={() => deleteVariation(index)}
                      startIcon={<DeleteIcon />}
                    >
                      Remove variation
                    </Button>
                  )}
                </Item>
              )}

              <Item sx={{ marginTop: '50px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontSize: '18px' }}
                      gutterBottom
                      component="div"
                    >
                      Basic Details
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'name', event.target.value)
                        }
                        label="Product Name *"
                        placeholder="iphone 12"
                        name="name"
                        value={item.name}
                        autoComplete="name"
                        autoFocus
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'description', event.target.value)
                        }
                        label="Product Description *"
                        name="description"
                        value={item.description}
                        autoComplete="description"
                        multiline
                        rows={4}
                        placeholder="Product description ..."
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'qty', event.target.value)
                        }
                        label="Product Quantity *"
                        name="qty"
                        value={item.qty}
                        autoComplete="qty"
                        type="number"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'color', event.target.value)
                        }
                        label="Product Color *"
                        name="color"
                        value={item.color}
                        autoComplete="color"
                        type="text"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'productId', event.target.value)
                        }
                        label="Product Code"
                        name="productId"
                        value={item.productId}
                        autoComplete="productId"
                      />

                      <Box
                        sx={{
                          display: 'flex',
                          width: '500px',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            handleChange(
                              index,
                              'productId',
                              generateRandomString(8, true),
                            )
                          }}
                          sx={{
                            color: 'white',
                            textTransform: 'unset',
                            '&:hover': { color: 'white' },
                            marginRight: '10px',
                          }}
                        >
                          Generate Product Code
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Item>

              <Item sx={{ marginTop: '50px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontSize: '18px' }}
                      gutterBottom
                      component="div"
                    >
                      Image
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      {item.image ? (
                        <ImagePlaceholder
                          url={item.image}
                          onDelete={() => setImageURL(index, '')}
                        />
                      ) : (
                        <Upload
                          setImageURL={(image) => setImageURL(index, image)}
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Item>

              <Item sx={{ marginTop: '50px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontSize: '18px' }}
                      gutterBottom
                      component="div"
                    >
                      Pricing
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'buyPrice', event.target.value)
                        }
                        label="Buying Price *"
                        name="buyPrice"
                        value={item.buyPrice}
                        autoComplete="buyPrice"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start">
                            <Typography sx={{ color: 'white' }}>
                              {Naira}
                            </Typography>
                          </InputAdornment>
                        }
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'sellPrice', event.target.value)
                        }
                        label="Selling Price *"
                        name="sellPrice"
                        value={item.sellPrice}
                        autoComplete="sellPrice"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start">
                            <Typography sx={{ color: 'white' }}>
                              {Naira}
                            </Typography>
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Item>

              <Item sx={{ marginTop: '50px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontSize: '18px' }}
                      gutterBottom
                      component="div"
                    >
                      Category
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Autocomplete
                        options={_.uniqBy(props.products, 'category')}
                        value={item.category}
                        onChange={(event, newValue: any) => {
                          if (typeof newValue === 'string') {
                            handleChange(index, 'category', newValue)
                          } else if (newValue && newValue.inputValue) {
                            handleChange(index, 'category', newValue.inputValue)
                          } else {
                            handleChange(
                              index,
                              'category',
                              newValue?.category || '',
                            )
                          }
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params)

                          const { inputValue } = params
                          // Suggest the creation of a new value
                          const isExisting = options.some(
                            (option) => inputValue === option.category,
                          )
                          if (inputValue !== '' && !isExisting) {
                            filtered.push({
                              inputValue,
                              // ...products[0],
                              category: `Add "${inputValue}"`,
                            })
                          }

                          return filtered
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        getOptionLabel={(option) => {
                          // Value selected with enter, right from the input
                          if (typeof option === 'string') {
                            return option
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValue) {
                            return option.inputValue
                          }
                          // Regular option
                          return option.category
                        }}
                        renderOption={(props, option) => (
                          <li {...props} style={{ color: 'black' }}>
                            {option.category}
                          </li>
                        )}
                        fullWidth
                        freeSolo
                        renderInput={(params) => (
                          <Box>
                            <InputLabel
                              shrink
                              sx={{ color: '#fff', fontSize: 16 }}
                            >
                              Product Category
                            </InputLabel>

                            <WhiteBorderTextField
                              {...params}
                              margin="dense"
                              name="category"
                              type="text"
                              required
                              variant="outlined"
                              InputLabelProps={{
                                style: { color: 'rgb(151, 161, 186)' },
                              }}
                              sx={{
                                width: '500px',
                                input: {
                                  color: 'white',
                                  height: '10px',
                                },
                                select: {
                                  color: 'black',
                                },
                                marginBottom: '20px',
                              }}
                            />
                          </Box>
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Item>

              <Item sx={{ marginTop: '50px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontSize: '18px' }}
                      gutterBottom
                      component="div"
                    >
                      Specifications
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Input
                        handleChange={(event: any) =>
                          handleChange(
                            index,
                            'serialNumber',
                            event?.target.value,
                          )
                        }
                        label="Serial Number"
                        name="serialNumber"
                        value={item.serialNumber}
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'RAM', event?.target.value)
                        }
                        label="RAM"
                        name="RAM"
                        value={item.RAM}
                        placeholder="8 GB"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'ROM', event?.target.value)
                        }
                        label="ROM"
                        name="ROM"
                        value={item.ROM}
                        placeholder="127 GB"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(
                            index,
                            'processorType',
                            event?.target.value,
                          )
                        }
                        label="Processor Type"
                        name="processorType"
                        value={item.processorType}
                        placeholder="Intel"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'size', event?.target.value)
                        }
                        label="Size"
                        name="size"
                        value={item.size}
                        placeholder="12 Inches"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'imei', event?.target.value)
                        }
                        label="IMEI Number"
                        name="imei"
                        value={item.imei}
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(
                            index,
                            'batteryHealth',
                            event?.target.value,
                          )
                        }
                        label="Battery Health"
                        name="batteryHealth"
                        value={item.batteryHealth}
                      />

                      <Box sx={{ marginBottom: '15px' }}>
                        <InputLabel shrink sx={{ color: '#fff', fontSize: 16 }}>
                          Finger print enabled?
                        </InputLabel>

                        <WhiteBorderTextField
                          select
                          margin="dense"
                          name="isFingerPrint"
                          type="text"
                          required
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: 'white' },
                          }}
                          SelectProps={{
                            native: true,
                          }}
                          onChange={(event: any) =>
                            handleChange(
                              index,
                              'isFingerPrint',
                              event?.target.value,
                            )
                          }
                          sx={{
                            width: '540px',
                            input: {
                              color: 'white',
                            },
                            select: {
                              color: 'white',
                            },
                            marginBottom: '20px',
                          }}
                        >
                          {selectOptions.map((option) => (
                            //@ts-ignore
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </WhiteBorderTextField>
                      </Box>

                      <Box sx={{ marginBottom: '15px' }}>
                        <InputLabel shrink sx={{ color: '#fff', fontSize: 16 }}>
                          Touch enabled?
                        </InputLabel>

                        <WhiteBorderTextField
                          select
                          margin="dense"
                          name="isTouch"
                          type="text"
                          required
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: 'white' },
                          }}
                          SelectProps={{
                            native: true,
                          }}
                          onChange={(event: any) =>
                            handleChange(index, 'isTouch', event?.target.value)
                          }
                          sx={{
                            width: '540px',
                            input: {
                              color: 'white',
                            },
                            select: {
                              color: 'white',
                            },
                            marginBottom: '20px',
                          }}
                        >
                          {selectOptions.map((option) => (
                            //@ts-ignore
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </WhiteBorderTextField>
                      </Box>

                      <Box sx={{ marginBottom: '15px' }}>
                        <InputLabel shrink sx={{ color: '#fff', fontSize: 16 }}>
                          Dedicated Memory?
                        </InputLabel>

                        <WhiteBorderTextField
                          select
                          margin="dense"
                          name="dedicatedMemory"
                          type="text"
                          required
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: 'white' },
                          }}
                          SelectProps={{
                            native: true,
                          }}
                          onChange={(event: any) =>
                            handleChange(
                              index,
                              'dedicatedMemory',
                              event?.target.value,
                            )
                          }
                          sx={{
                            width: '540px',
                            input: {
                              color: 'white',
                            },
                            select: {
                              color: 'white',
                            },
                            marginBottom: '20px',
                          }}
                        >
                          {selectOptions.map((option) => (
                            //@ts-ignore
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </WhiteBorderTextField>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Item>

              <Item sx={{ marginTop: '50px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'white', fontSize: '18px' }}
                      gutterBottom
                      component="div"
                    >
                      Supplier Details
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Input
                        handleChange={(event: any) =>
                          handleChange(index, 'supplier', event?.target.value)
                        }
                        label="Supplier"
                        name="supplier"
                        value={item.supplier}
                        autoComplete="supplier"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(
                            index,
                            'supplierNumber',
                            event?.target.value,
                          )
                        }
                        label="Supplier Phone Number"
                        name="supplierNumber"
                        value={item.supplierNumber}
                        autoComplete="supplierNumber"
                        type="tel"
                      />

                      <Input
                        handleChange={(event: any) =>
                          handleChange(
                            index,
                            'manufacturer',
                            event?.target.value,
                          )
                        }
                        label="Manufacturer"
                        name="manufacturer"
                        value={item.manufacturer}
                        autoComplete="manufacturer"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Item>
            </>
          ))}
        </Box>

        <Button
          color="success"
          sx={{
            background: 'rgba(255, 255, 255, 0.08)',
            marginTop: '30px',
            width: '100%',
            height: '50px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'rgb(16, 185, 129)',
            },
          }}
          onClick={addNewVariation}
          startIcon={<AddIcon />}
        >
          Add new variation
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: '50px 0',
          }}
        >
          <Box>
            <CancelButton text="Delete" onClick={onDelete} />
          </Box>

          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{
                color: 'white',
                textTransform: 'unset',
                '&:hover': { color: 'white' },
                marginRight: '10px',
              }}
            >
              Cancel
            </Button>

            <DarkContainedButton
              text="Create"
              disabled={disabled()}
              onClick={onSubmit}
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

CreateNewProduct.auth = true

export default CreateNewProduct

export const getServerSideProps: GetServerSideProps = async (context) => {
  const variation = context.query['variation']
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

  let products: any[] = []
  let initialState = {}

  try {
    const response = await axios.get(`products/${variation}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    initialState = {
      name: response.data?.data?.product?.name?.split(' (')[0],
      description: response.data?.data?.product.description,
      image: response.data?.data?.product.image,
      buyPrice: response.data?.data?.product.buyPrice,
      sellPrice: response.data?.data?.product.sellPrice,
      category: response.data?.data?.product.category,
      qty: response.data?.data?.product.qty,
      supplier: response.data?.data?.product.supplier,
      manufacturer: response.data?.data?.product.manufacturer,
      serialNumber: response.data?.data?.product.serialNumber,
      RAM: response.data?.data?.product.RAM,
      ROM: response.data?.data?.product.ROM,
      processorType: response.data?.data?.product.processorType,
      size: response.data?.data?.product.size,
      imei: response.data?.data?.product.imei,
      batteryHealth: response.data?.data?.product.batteryHealth,
      isFingerPrint: response.data?.data?.product.isFingerPrint,
      isTouch: response.data?.data?.product.isTouch,
      dedicatedMemory: response.data?.data?.product.dedicatedMemory,
      productId: response.data?.data?.product.productId,
      supplierNumber: response.data?.data?.product.supplierNumber,
      color: response.data?.data?.product.color,
      productGroupId: response.data?.data?.product.productGroupId,
    }
  } catch (error) {
    console.log('Can not find product')
    initialState = INITIAL_STATE
  }

  try {
    const response = await axios.get('products?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    products = response?.data?.data?.results
  } catch (error) {
    console.log('Can not find products')
  }

  return {
    props: {
      token,
      products,
      initialState,
    },
  }
}
