import * as React from 'react'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PieChartIcon from '@mui/icons-material/PieChart'
import Button from '@mui/material/Button'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { ROUTES } from 'utils/constants'
import styles from './styles'
import {
  checkIfPageIsActive,
  checkIfSubPageIsActive,
  checkReportsPageIsActive,
  checkCustomersPageIsActive,
} from 'utils/helpers'

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={styles.container}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{ background: 'transparent', margin: 0 }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={
            <ChevronRightIcon
              sx={
                checkReportsPageIsActive().isReportPageActive ||
                checkReportsPageIsActive().isReportSalesPageActive
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box
            sx={
              checkReportsPageIsActive().isReportPageActive ||
              checkReportsPageIsActive().isReportSalesPageActive
                ? styles.activeNavHeader
                : styles.inactiveNavHeader
            }
          >
            <PieChartIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Reports</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={
              checkReportsPageIsActive().isReportPageActive
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.DASHBOARD}
          >
            Overview
          </Button>
          <Button
            variant="text"
            sx={
              checkReportsPageIsActive().isReportSalesPageActive
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.DASHBOARD_SALES}
          >
            Sales
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{ background: 'transparent', margin: 0 }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={
            <ChevronRightIcon
              sx={
                checkCustomersPageIsActive().isCustomerPageActive ||
                checkCustomersPageIsActive().isCustomerPageActive ||
                checkCustomersPageIsActive().isCustomerSummaryPageActive
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Box
            sx={
              checkCustomersPageIsActive().isCustomerPageActive ||
              checkCustomersPageIsActive().isCustomerPageActive ||
              checkCustomersPageIsActive().isCustomerSummaryPageActive
                ? styles.activeNavHeader
                : styles.inactiveNavHeader
            }
          >
            <PeopleIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Customers</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={
              checkCustomersPageIsActive().isCustomerPageActive
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.CUSTOMERS}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={
              checkCustomersPageIsActive().isCustomerOrderPageActive
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.CUSTOMERS_ORDERS}
          >
            Orders
          </Button>
          <Button
            variant="text"
            sx={
              checkCustomersPageIsActive().isCustomerSummaryPageActive
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.CUSTOMERS_SUMMARY}
          >
            Summary
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{ background: 'transparent', margin: 0 }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={
            <ChevronRightIcon
              sx={
                checkIfPageIsActive(ROUTES.ORDER)
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
          }
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Box
            sx={
              checkIfPageIsActive(ROUTES.ORDER)
                ? styles.activeNavHeader
                : styles.inactiveNavHeader
            }
          >
            <InventoryIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Orders</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={
              checkIfPageIsActive(ROUTES.ORDER)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.ORDER}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.ORDER_SUMMARY, ROUTES.ORDER)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.ORDER_SUMMARY}
          >
            Summary
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={{ background: 'transparent', margin: 0 }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={
            <ChevronRightIcon
              sx={
                checkIfPageIsActive(ROUTES.PRODUCTS)
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
          }
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Box
            sx={
              checkIfPageIsActive(ROUTES.PRODUCTS)
                ? styles.activeNavHeader
                : styles.inactiveNavHeader
            }
          >
            <ShoppingCartIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Products</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={
              checkIfPageIsActive(ROUTES.PRODUCTS)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.PRODUCTS}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.PRODUCTS_SUMMARY, ROUTES.PRODUCTS)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.PRODUCTS_SUMMARY}
          >
            Summary
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.PRODUCTS_INVENTORY, ROUTES.PRODUCTS)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.PRODUCTS_INVENTORY}
          >
            Inventory
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.PRODUCTS_INSIGHTS, ROUTES.PRODUCTS)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.PRODUCTS_INSIGHTS}
          >
            Insights
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
        sx={{ background: 'transparent', margin: 0 }}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={
            <ChevronRightIcon
              sx={
                checkIfPageIsActive(ROUTES.INVOICE)
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
          }
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Box
            sx={
              checkIfPageIsActive(ROUTES.INVOICE)
                ? styles.activeNavHeader
                : styles.inactiveNavHeader
            }
          >
            <ReceiptIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Invoices</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={
              checkIfPageIsActive(ROUTES.INVOICE)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.INVOICE}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.INVOICE_CREATE, ROUTES.INVOICE)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.INVOICE_CREATE}
          >
            Create
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.INVOICE_DETAILS, ROUTES.INVOICE)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.INVOICE_DETAILS}
          >
            Details
          </Button>
          <Button
            variant="text"
            sx={
              checkIfSubPageIsActive(ROUTES.INVOICE_PREVIEW, ROUTES.INVOICE)
                ? styles.activeNavSubHeader
                : styles.navSubHeader
            }
            href={ROUTES.INVOICE_PREVIEW}
          >
            Preview
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default Sidebar
