import { useState, MouseEvent, useEffect } from 'react'
import Box from '@mui/material/Box'
import Wrapper from './Wrapper'
import { Item, StyledMenu } from './styled'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import styles from './styles'
import Grid from '@mui/material/Grid'
import { ROUTES } from 'utils/constants'
import { renderPrice, formatWord } from 'utils/helpers'
import Avatar from '@mui/material/Avatar'
import dayjs from 'dayjs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  makeDeleteProductRequest,
  makeSingleProductRequest,
} from 'api/products'
import queryString from 'query-string'
import { useAppDispatch } from 'redux-store/hooks'
import { useNavigate } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader'
import EditProduct from './EditProduct'
import UpdateProductImage from './UpdateProductImage'

const Summary = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const onDeleteProduct = async () => {
    setDeleteLoading(true)

    await makeDeleteProductRequest(
      { id: data?.id, price: data?.costprice },
      dispatch,
    )
    setDeleteLoading(false)
    navigate(ROUTES.PRODUCTS)
  }

  const updateCallback = (payload: any) => setData(payload)

  useEffect(() => {
    ;(async () => {
      const parsed: any = queryString.parse(window.location.search)
      setLoading(true)
      const response = await makeSingleProductRequest(parsed.id)
      setData(response)
      setLoading(false)
    })()
  }, [])

  return (
    <Wrapper>
      {loading ? (
        <Box sx={styles.loaderContainer}>
          <BounceLoader color="white" size={30} />
        </Box>
      ) : (
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={styles.header}>
            <Typography sx={styles.headerText}>{data?.name}</Typography>

            <Box sx={styles.infoHeader}>
              <Button
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={styles.menuButton}
              >
                Actions
              </Button>

              <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <EditProduct initialState={data} update={updateCallback} />

                <MenuItem
                  onClick={onDeleteProduct}
                  sx={styles.menuItem}
                  disableRipple
                >
                  {deleteLoading ? (
                    'Deleting ...'
                  ) : (
                    <>
                      <DeleteIcon sx={styles.menuIcon} />
                      Delete
                    </>
                  )}
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ marginTop: '-15px' }}>
              <Item sx={{ padding: '20px 20px 0 20px' }}>
                <Box sx={styles.imageContainer}>
                  <Avatar
                    alt={data?.name}
                    sx={styles.image}
                    src={data?.image}
                  />
                  <UpdateProductImage
                    initialState={data}
                    update={updateCallback}
                  />
                </Box>

                <Grid container spacing={2} sx={styles.infoContainer}>
                  <Grid item xs={4}>
                    <Typography sx={styles.label}>ID</Typography>
                    <Typography sx={styles.label}>Quantity</Typography>
                    <Typography sx={styles.label}>Cost Price</Typography>
                    <Typography sx={styles.label}>Selling Price</Typography>
                    <Typography sx={styles.label}>Supplier</Typography>
                    <Typography sx={styles.label}>Manufacturer</Typography>
                    <Typography sx={styles.label}>Serial Number</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography sx={styles.value}>{data?.id}</Typography>
                    <Typography sx={styles.value}>{data?.quantity}</Typography>
                    <Typography sx={styles.value}>
                      {renderPrice(data?.costprice)}
                    </Typography>
                    <Typography sx={styles.value}>
                      {renderPrice(data?.sellingprice)}
                    </Typography>
                    <Typography sx={styles.value}>{data?.supplier}</Typography>
                    <Typography sx={styles.value}>
                      {data?.manufacturer}
                    </Typography>
                    <Typography sx={styles.value}>
                      {data?.serial_number}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                <Grid container spacing={2} sx={styles.infoContainer}>
                  <Grid item xs={4}>
                    <Typography sx={styles.label}>IMEI Number</Typography>
                    <Typography sx={styles.label}>Category</Typography>
                    <Typography sx={styles.label}>RAM</Typography>
                    <Typography sx={styles.label}>ROM</Typography>
                    <Typography sx={styles.label}>Processor</Typography>
                    <Typography sx={styles.label}>Size</Typography>
                    <Typography sx={styles.label}>Fingerprint</Typography>
                    <Typography sx={styles.label}>Touch</Typography>
                    <Typography sx={styles.label}>Dedicated</Typography>
                    {/* <Typography sx={styles.label}>Color</Typography> */}
                    <Typography sx={styles.label}>Battery Health</Typography>
                    <Typography sx={styles.label}>Date</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography sx={styles.value}>{data?.imei}</Typography>
                    <Typography sx={styles.value}>
                      {formatWord(data?.category)}
                    </Typography>
                    <Typography sx={styles.value}>{data?.RAM}</Typography>
                    <Typography sx={styles.value}>{data?.ROM}</Typography>
                    <Typography sx={styles.value}>{data?.processor}</Typography>
                    <Typography sx={styles.value}>{data?.size}</Typography>
                    <Typography sx={styles.value}>
                      {data?.fingerprint === true ? 'Yes' : 'No'}
                    </Typography>
                    <Typography sx={styles.value}>
                      {data?.touch === true ? 'Yes' : 'No'}
                    </Typography>
                    <Typography sx={styles.value}>
                      {data?.dedicated === true ? 'Yes' : 'No'}
                    </Typography>
                    {/* <Typography sx={styles.value}>{data?.color}</Typography> */}
                    <Typography sx={styles.value}>
                      {data?.battery_health}
                    </Typography>
                    <Typography sx={styles.value}>
                      {dayjs(data?.createdAt).format('MMM D, YYYY HH:mm')}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}
    </Wrapper>
  )
}

export default Summary
