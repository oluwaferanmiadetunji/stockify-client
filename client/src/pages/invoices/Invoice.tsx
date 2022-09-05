import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import styles from './styles'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { renderPrice } from 'utils/helpers'
import { Card, Item } from './styled'
import ReactApexChart from 'react-apexcharts'
import { config } from './constants'
import VirtualizedTable from './VirtualizedTable'
import { rows } from './constants'

const Invoices = () => {
  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography
            variant="h5"
            sx={styles.headerText}
            gutterBottom
            component="div"
          >
            Invoices
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ color: 'white', textTransform: 'unset' }}
              component={RouterLink}
              to={ROUTES.INVOICE_CREATE}
            >
              Add
            </Button>
          </Stack>
        </Box>

        <Card>
          <Box>
            <Typography
              variant="h5"
              sx={styles.cardLabel}
              gutterBottom
              component="div"
            >
              TOTAL NET INCOME
            </Typography>

            <Typography
              variant="h5"
              sx={styles.cardValue}
              gutterBottom
              component="div"
            >
              {renderPrice(0)}
            </Typography>

            <Typography
              variant="h5"
              sx={styles.cardCaption}
              gutterBottom
              component="div"
            >
              From a total of 0 Invoices
            </Typography>
          </Box>

          <Box>
            <ReactApexChart
              options={config.options}
              series={config.series}
              type="donut"
            />
          </Box>
        </Card>

        <Item sx={{ marginTop: '30px', height: 550 }}>
          <VirtualizedTable
            //@ts-ignore
            rowCount={rows.length}
            rowGetter={({ index }: any) => rows[index]}
            columns={[
              {
                width: 300,
                label: 'Order ID',
                dataKey: 'dessert',
              },
              {
                width: 300,
                label: 'Invoice Date',
                dataKey: 'calories',
                numeric: true,
              },
              {
                width: 300,
                label: 'Due Date',
                dataKey: 'fat',
                numeric: true,
              },
              {
                width: 300,
                label: 'Total',
                dataKey: 'carbs',
                numeric: true,
              },
              {
                width: 300,
                label: 'Status',
                dataKey: 'protein',
                numeric: true,
              },
            ]}
          />
        </Item>
      </Box>
    </Layout>
  )
}

export default Invoices
