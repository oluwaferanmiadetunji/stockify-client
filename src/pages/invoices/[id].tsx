import { useState, useEffect } from 'react'
import Layout from 'components/layout'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import RouterLink from 'next/link'
import { ROUTES } from 'utils/constant'
import { renderPrice } from 'utils/helpers'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import dayjs from 'dayjs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import EmailIcon from '@mui/icons-material/Email'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { DarkContainedButton } from 'components/buttons'
import { toast } from 'react-toastify'

const OPTIONS = [
  {
    label: 'Invoice Created',
    value: 'invoice-created',
  },
  {
    label: 'Payment received',
    value: 'payment-received',
  },
]

const LOADING_TYPE = {
  page: 'page',
  update: 'update',
  duplicate: 'duplicate',
  delete: 'delete',
}

const getTotalPrice = (items: any[]) => {
  let sum = 0

  for (let i = 0; i < items.length; i++) {
    sum += items[i].qty * items[i].sellPrice
  }

  return renderPrice(sum)
}

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  back: {
    color: 'white',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
  },
  headerText: {
    color: 'white',
    fontSize: '22px',
    marginTop: '10px',
  },
  dot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  status: {
    color: 'white',
    fontSize: '14px',
    marginTop: '10px',
  },
  content: {
    marginTop: '10px',
  },
  divider: {
    bgcolor: 'white',
    marginBottom: '5px',
    width: '100%',
  },

  box: {
    marginBottom: '30px',
  },
  label: {
    marginBottom: '7px',
    color: 'white',
    fontSize: '14px',
  },
  value: {
    color: 'rgb(151, 161, 186)',
    fontSize: '16px',
  },
  textfield: {
    input: {
      color: 'white',
    },
    select: {
      color: 'white',
    },
    marginBottom: '20px',
    '& legend': { display: 'none' },
    '& fieldset': { top: 0 },
  },
  loaderContainer: {
    height: 400,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgb(17, 24, 39)',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginBottom: '25px',
}))

const Details = (props: any) => {
  const navigate = useRouter()

  const [option, setOption] = useState(OPTIONS[0].value)

  const [data, setData] = useState<any>({})

  useEffect(() => {
    setData(props.invoice)
  }, [props.invoice])

  const [loading, setLoading] = useState({
    value: false,
    type: LOADING_TYPE.page,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value)
  }

  const markAsPaid = async () => {
    setLoading({
      value: true,
      type: LOADING_TYPE.update,
    })

    try {
      const response = await axios.patch(
        `invoices/${props.id}`,
        { isPaid: true },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      )
      toast.success('Invoice marked as paid')
      navigate.reload()
    } catch (error) {
      toast.error(
        //@ts-ignore
        error?.response?.data?.message ||
          'Error marking invoice as paid. Please try again',
      )
    } finally {
      setLoading({ value: false, type: LOADING_TYPE.update })
    }
  }

  const onDeleteInvoice = async () => {
    setLoading({
      value: true,
      type: LOADING_TYPE.delete,
    })
    try {
      await axios.delete(`invoices/${props.id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })

      toast.success('Invoice deleted successfully')

      navigate.push(ROUTES.INVOICES)
    } catch (e) {
      //@ts-ignore
      toast.error(e?.response?.data?.message || 'Error deleting invoie')
    } finally {
      setLoading({
        value: false,
        type: LOADING_TYPE.delete,
      })
    }
  }

  return (
    <Layout title="Invoices">
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            component={RouterLink}
            href={ROUTES.INVOICES}
          >
            Invoices
          </Button>
        </Box>

        <Box>
          <Box sx={styles.header}>
            <Typography sx={styles.headerText}>#{data?.id}</Typography>

            <DarkContainedButton
              text="Preview"
              component={RouterLink}
              href={`${ROUTES.INVOICES}/${data?.id}/preview`}
              startIcon={<VisibilityIcon />}
            />
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
                      <Typography sx={styles.value}>
                        {data?.customer?.name}
                      </Typography>
                    </Box>

                    <Box sx={styles.box}>
                      <Typography sx={styles.label}>Invoice Number</Typography>
                      <Typography sx={styles.value}>{data?.id}</Typography>
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
                        {dayjs(data?.dueDate).format('MMM D, YYYY HH:mm')}
                      </Typography>
                    </Box>

                    {data?.isPaid && (
                      <Box sx={styles.box}>
                        <Typography sx={styles.label}>Paid On</Typography>
                        <Typography sx={styles.value}>
                          {dayjs(data?.paidOn).format('MMM D, YYYY HH:mm')}
                        </Typography>
                      </Box>
                    )}

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
                            {row.name}
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
                            {renderPrice(row?.sellPrice)}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: 'rgb(151, 161, 186)' }}
                          >
                            {renderPrice(row?.buyPrice * row?.qty)}
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

                  <DarkContainedButton
                    text="Send Email"
                    startIcon={<EmailIcon />}
                    styles={{ margin: '20px 0' }}
                    disabled
                  />
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
                        href={`${ROUTES.INVOICES}/${data?.id}/preview`}
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
                        onClick={onDeleteInvoice}
                        disabled={
                          loading.value && loading.type === LOADING_TYPE.delete
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
      </Box>
    </Layout>
  )
}

export default Details

Details.auth = true

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id

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

  let invoice = {}

  // @ts-ignore
  const token = session?.accessToken

  try {
    const response = await axios.get(`invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    invoice = response.data.data
  } catch (error) {
    //@ts-ignore
    console.log(error?.response)

    return {
      redirect: {
        permanent: false,
        destination: ROUTES.INVOICES,
      },
    }
  }
  return {
    props: { id, invoice, token },
  }
}
