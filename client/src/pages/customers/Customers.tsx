import { useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles, { Item } from './styles'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'
import { selectCustomerState } from 'redux-store/customers.slice'
import { makeCustomerQueryRequest } from 'api/customers'
import AddCustomer from './AddCustomer'
import FilterCustomer from './FilterCustomers'
import VirtualizedTable from './MuiVirtualizedTable'
import Stack from '@mui/material/Stack'

const Customers = () => {
  const dispatch = useAppDispatch()
  const { customers, filteredCustomers, isFiltered } = useAppSelector(
    selectCustomerState,
  )

  useEffect(() => {
    ;(async () => {
      await makeCustomerQueryRequest(
        'limit=1000&sortBy=createdAt:desc',
        dispatch,
      )
    })()
  }, [dispatch])

  return (
    <Layout>
      <Box sx={styles.header}>
        <Typography
          variant="h5"
          sx={styles.headerText}
          gutterBottom
          component="div"
        >
          Customers
        </Typography>

        <Stack direction="row" spacing={2}>
          <FilterCustomer />

          <AddCustomer />
        </Stack>
      </Box>

      <Box sx={styles.container}>
        <Item sx={{ height: 550 }}>
          <VirtualizedTable
            //@ts-ignore
            rowCount={isFiltered ? filteredCustomers?.length : customers.length}
            rowGetter={({ index }: any) =>
              isFiltered ? filteredCustomers[index] : customers[index]
            }
            columns={[
              {
                width: 300,
                label: 'First Name',
                dataKey: 'firstname',
              },
              {
                width: 300,
                label: 'Last Name',
                dataKey: 'lastname',
              },
              {
                width: 300,
                label: 'Email Address',
                dataKey: 'email',
              },
              {
                width: 300,
                label: 'Phone Number',
                dataKey: 'phone',
              },
              {
                width: 300,
                label: 'Date',
                dataKey: 'createdAt',
              },
            ]}
          />
        </Item>
      </Box>
    </Layout>
  )
}

export default Customers
