import { useState } from 'react'
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
import { getBooleanValue } from 'utils/helpers'
import _ from 'lodash'

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
  const initialState = {
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
  }
  const Router = useRouter()
  const [state, setState] = useState(initialState)

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const setImageURL = (image: string) => {
    setState({
      ...state,
      image,
    })
  }

  const onCancel = () => {
    setState(initialState)
  }

  const onDelete = () => {
    onCancel()
    Router.push(ROUTES.PRODUCTS)
  }

  const parseData = (state: any) => {
    return {
      ...state,
      qty: Number(state.qty),
      buyPrice: Number(state.buyPrice),
      sellPrice: Number(state.sellPrice),
      isFingerPrint: getBooleanValue(state.isFingerPrint),
      isTouch: getBooleanValue(state.isTouch),
      dedicatedMemory: getBooleanValue(state.dedicatedMemory),
    }
  }

  const disabled =
    !state.name ||
    !state.description ||
    !state.buyPrice ||
    !state.sellPrice ||
    !state.qty

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

      setState(initialState)
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
                  handleChange={handleChange}
                  label="Product Name *"
                  placeholder="iphone 12"
                  name="name"
                  value={state.name}
                  autoComplete="name"
                  autoFocus
                />

                <Input
                  handleChange={handleChange}
                  label="Product Description *"
                  name="description"
                  value={state.description}
                  autoComplete="description"
                  multiline
                  rows={4}
                  placeholder="Product description ..."
                />

                <Input
                  handleChange={handleChange}
                  label="Product Quantity *"
                  name="qty"
                  value={state.qty}
                  autoComplete="qty"
                  type="number"
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
                Image
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box>
                {state.image ? (
                  <ImagePlaceholder
                    url={state.image}
                    onDelete={() => setState({ ...state, image: '' })}
                  />
                ) : (
                  <Upload setImageURL={setImageURL} />
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
                  handleChange={handleChange}
                  label="Buying Price *"
                  name="buyPrice"
                  value={state.buyPrice}
                  autoComplete="buyPrice"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography sx={{ color: 'white' }}>{Naira}</Typography>
                    </InputAdornment>
                  }
                />

                <Input
                  handleChange={handleChange}
                  label="Selling Price *"
                  name="sellPrice"
                  value={state.sellPrice}
                  autoComplete="sellPrice"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography sx={{ color: 'white' }}>{Naira}</Typography>
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
                  value={state.category}
                  onChange={(event, newValue: any) => {
                    if (typeof newValue === 'string') {
                      handleChange({
                        target: { name: 'category', value: newValue },
                      })
                    } else if (newValue && newValue.inputValue) {
                      handleChange({
                        target: {
                          name: 'category',
                          value: newValue.inputValue,
                        },
                      })
                    } else {
                      handleChange({
                        target: {
                          name: 'category',
                          value: newValue?.category || '',
                        },
                      })
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
                      <InputLabel shrink sx={{ color: '#fff', fontSize: 16 }}>
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
                  handleChange={handleChange}
                  label="Serial Number"
                  name="serialNumber"
                  value={state.serialNumber}
                />

                <Input
                  handleChange={handleChange}
                  label="RAM"
                  name="RAM"
                  value={state.RAM}
                  placeholder="8 GB"
                />

                <Input
                  handleChange={handleChange}
                  label="ROM"
                  name="ROM"
                  value={state.ROM}
                  placeholder="127 GB"
                />

                <Input
                  handleChange={handleChange}
                  label="Processor Type"
                  name="processorType"
                  value={state.processorType}
                  placeholder="Intel"
                />

                <Input
                  handleChange={handleChange}
                  label="Size"
                  name="size"
                  value={state.size}
                  placeholder="12 Inches"
                />

                <Input
                  handleChange={handleChange}
                  label="IMEI Number"
                  name="imei"
                  value={state.imei}
                />

                <Input
                  handleChange={handleChange}
                  label="Battery Health"
                  name="batteryHealth"
                  value={state.batteryHealth}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  handleChange={handleChange}
                  label="Supplier"
                  name="supplier"
                  value={state.supplier}
                  autoComplete="supplier"
                />

                <Input
                  handleChange={handleChange}
                  label="manufacturer"
                  name="manufacturer"
                  value={state.manufacturer}
                  autoComplete="manufacturer"
                />
              </Box>
            </Grid>
          </Grid>
        </Item>

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
              disabled={disabled}
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
      token,
      products,
    },
  }
}
