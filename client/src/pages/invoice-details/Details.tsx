import { useState, useEffect } from 'react'
import Layout from 'components/layout'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { renderPriceWithCommas } from 'utils/helpers'
import styles from './styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { Item } from './styled'
import { OPTIONS, LOADING_TYPE } from './constants'
import dayjs from 'dayjs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { getTotalPrice } from './helpers'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import EmailIcon from '@mui/icons-material/Email'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  makeSingleInvoiceRequest,
  makeUpdateInvoiceRequest,
  makeDeleteInvoiceRequest,
} from 'api/invoices'
import queryString from 'query-string'
import BounceLoader from 'react-spinners/BounceLoader'
import {
  selectInvoiceState,
  setSingleInvoiceData,
} from 'redux-store/invoice.slice'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { formatCreateInvoicePayload } from './helpers'
import { makeCreateInvoiceRequest } from 'api/invoices'

const Details = () => {
  const navigate = useNavigate()
  const parsed: any = queryString.parse(window.location.search)

  const dispatch = useAppDispatch()
  const { invoice } = useAppSelector(selectInvoiceState)

  const [option, setOption] = useState(OPTIONS[0].value)

  const [data, setData] = useState<any>(
    parsed.id === invoice?.id ? invoice : {},
  )
  const [loading, setLoading] = useState({
    value: false,
    type: LOADING_TYPE.page,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value)
  }

  useEffect(() => {
    ;(async () => {
      setLoading({
        value: true,
        type: LOADING_TYPE.page,
      })
      const response = await makeSingleInvoiceRequest(parsed.id)
      setData(response)
      dispatch(setSingleInvoiceData(response))
      setLoading({ value: false, type: LOADING_TYPE.page })
    })()
  }, [dispatch, parsed.id])

  const markAsPaid = async () => {
    setLoading({
      value: true,
      type: LOADING_TYPE.update,
    })
    await makeUpdateInvoiceRequest(data?.id, { isPaid: true }, dispatch)

    setLoading({ value: false, type: LOADING_TYPE.update })
    window.location.reload()
  }

  const callback = () => {
    setLoading({
      value: false,
      type: LOADING_TYPE.duplicate,
    })
  }

  const duplicateInvoice = async () => {
    setLoading({
      value: true,
      type: LOADING_TYPE.duplicate,
    })

    await makeCreateInvoiceRequest(
      formatCreateInvoicePayload(data),
      dispatch,
      callback,
      navigate,
      'Invoice duplicated successfully',
    )
  }

  const onDeleteInvoice = async () => {
    setLoading({
      value: true,
      type: LOADING_TYPE.delete,
    })
    await makeDeleteInvoiceRequest({ id: data?.id }, dispatch)

    setLoading({
      value: false,
      type: LOADING_TYPE.delete,
    })

    navigate(ROUTES.INVOICE)
  }

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={RouterLink}
            to={ROUTES.INVOICE}
          >
            Invoices
          </Button>
        </Box>

        {loading.value &&
        loading.type === LOADING_TYPE.page &&
        Object.keys(data).length === 0 &&
        data.constructor === Object ? (
          <Box sx={styles.loaderContainer}>
            <BounceLoader color="white" size={30} />
          </Box>
        ) : (
          <Box>
            <Box sx={styles.header}>
              <Typography sx={styles.headerText}>
                #{data?.invoice_number}
              </Typography>

              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                sx={{ color: 'white', textTransform: 'unset' }}
                component={RouterLink}
                to={`${ROUTES.INVOICE_PREVIEW}?id=${data?.id}`}
              >
                Preview
              </Button>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Typography
                sx={{
                  ...styles.dot,
                  backgroundColor: data?.isPaid ? 'green' : 'rgb(230, 73, 45)',
                }}
              ></Typography>
              <Typography
                sx={{
                  ...styles.status,
                  color: data?.isPaid ? 'green' : 'rgb(230, 73, 45)',
                }}
              >
                {data?.isPaid ? 'Paid' : 'Unpaid'}
              </Typography>
            </Stack>

            <Grid container spacing={3} sx={styles.content}>
              <Grid item xs={7}>
                <Item>
                  <Box sx={{ padding: '10px 20px' }}>
                    <Typography sx={{ ...styles.headerText, fontSize: '18px' }}>
                      Invoice Details
                    </Typography>
                  </Box>

                  <Divider sx={styles.divider} />

                  <Grid container spacing={2} sx={{ padding: '10px 20px' }}>
                    <Grid item xs={6}>
                      <Box sx={styles.box}>
                        <Typography sx={styles.label}>Customer Name</Typography>
                        <Typography
                          sx={styles.value}
                        >{`${data?.customer?.firstname} ${data?.customer?.lastname}`}</Typography>
                      </Box>

                      <Box sx={styles.box}>
                        <Typography sx={styles.label}>
                          Invoice Number
                        </Typography>
                        <Typography sx={styles.value}>
                          {data?.invoice_number}
                        </Typography>
                      </Box>

                      <Box sx={styles.box}>
                        <Typography sx={styles.label}>Invoice Date</Typography>
                        <Typography sx={styles.value}>
                          {dayjs(data?.createdAt).format('MMM D, YYYY HH:mm')}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={styles.box}>
                        <Typography sx={styles.label}>Due Date</Typography>
                        <Typography sx={styles.value}>
                          {dayjs(data?.due_date).format('MMM D, YYYY HH:mm')}
                        </Typography>
                      </Box>

                      <Box sx={styles.box}>
                        <Typography sx={styles.label}>Notes</Typography>
                        <Typography sx={styles.value}>{data?.notes}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Item>

                <Item>
                  <Box sx={{ padding: '10px 20px' }}>
                    <Typography sx={{ ...styles.headerText, fontSize: '18px' }}>
                      Line Items
                    </Typography>
                  </Box>

                  <Divider sx={styles.divider} />

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'white' }}>Item</TableCell>
                          <TableCell align="right" sx={{ color: 'white' }}>
                            Qty
                          </TableCell>
                          <TableCell align="right" sx={{ color: 'white' }}>
                            Unit Price
                          </TableCell>
                          <TableCell align="right" sx={{ color: 'white' }}>
                            Total
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {data?.items?.map((row: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell sx={{ color: 'rgb(151, 161, 186)' }}>
                              {row.product.name}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: 'rgb(151, 161, 186)' }}
                            >
                              {row.qty}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: 'rgb(151, 161, 186)' }}
                            >
                              {renderPriceWithCommas(row?.sellingPrice)}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: 'rgb(151, 161, 186)' }}
                            >
                              {renderPriceWithCommas(
                                row?.sellingPrice * row?.qty,
                              )}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell sx={{ color: 'white' }}>Total</TableCell>

                          <TableCell
                            align="right"
                            sx={{ color: 'rgb(151, 161, 186)' }}
                          >
                            {getTotalPrice(data?.items || [])}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              </Grid>

              <Grid item xs={5}>
                <Item>
                  <Box sx={{ padding: '10px 20px' }}>
                    <Typography sx={{ ...styles.headerText, fontSize: '18px' }}>
                      Send Notification
                    </Typography>
                  </Box>

                  <Divider sx={styles.divider} />

                  <Box
                    component="form"
                    sx={{ padding: '10px 20px' }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      select
                      label=""
                      color="secondary"
                      value={option}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                      sx={styles.textfield}
                      InputLabelProps={{
                        style: { color: 'white' },
                        shrink: false,
                      }}
                    >
                      {OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="outlined"
                      startIcon={<EmailIcon />}
                      sx={{
                        color: 'rgb(182, 146, 246)',
                        textTransform: 'unset',
                        marginBottom: '10px',
                      }}
                    >
                      Send Email
                    </Button>
                  </Box>

                  <Divider sx={styles.divider} />

                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to={`${ROUTES.INVOICE_PREVIEW}?id=${data?.id}`}
                        >
                          <ListItemIcon>
                            <VisibilityIcon />
                          </ListItemIcon>
                          <ListItemText
                            sx={{ color: 'white', fontSize: '14px' }}
                            primary="Preview"
                          />
                        </ListItemButton>
                      </ListItem>

                      {!data?.isPaid && (
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={markAsPaid}
                            disabled={
                              loading.value &&
                              loading.type === LOADING_TYPE.update
                            }
                          >
                            {loading.value &&
                            loading.type === LOADING_TYPE.update ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  width: '100%',
                                  textAlign: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <CircularProgress
                                  size={25}
                                  sx={{ color: 'white' }}
                                />
                              </Box>
                            ) : (
                              <>
                                <ListItemIcon>
                                  <PriceCheckIcon />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{ color: 'white', fontSize: '14px' }}
                                  primary="Mark Paid"
                                />
                              </>
                            )}
                          </ListItemButton>
                        </ListItem>
                      )}

                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={duplicateInvoice}
                          disabled={
                            loading.value &&
                            loading.type === LOADING_TYPE.duplicate
                          }
                        >
                          {loading.value &&
                          loading.type === LOADING_TYPE.duplicate ? (
                            <Box
                              sx={{
                                display: 'flex',
                                width: '100%',
                                textAlign: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <CircularProgress
                                size={25}
                                sx={{ color: 'white' }}
                              />
                            </Box>
                          ) : (
                            <>
                              <ListItemIcon>
                                <FolderCopyIcon />
                              </ListItemIcon>
                              <ListItemText
                                sx={{ color: 'white', fontSize: '14px' }}
                                primary="Duplicate"
                              />
                            </>
                          )}
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={onDeleteInvoice}
                          disabled={
                            loading.value &&
                            loading.type === LOADING_TYPE.delete
                          }
                        >
                          {loading.value &&
                          loading.type === LOADING_TYPE.delete ? (
                            <Box
                              sx={{
                                display: 'flex',
                                width: '100%',
                                textAlign: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <CircularProgress
                                size={25}
                                sx={{ color: 'white' }}
                              />
                            </Box>
                          ) : (
                            <>
                              <ListItemIcon>
                                <DeleteIcon />
                              </ListItemIcon>
                              <ListItemText
                                sx={{ color: 'white', fontSize: '14px' }}
                                primary="Delete"
                              />
                            </>
                          )}
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default Details
