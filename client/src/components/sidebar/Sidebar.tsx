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
          expandIcon={<ChevronRightIcon sx={styles.activeIcon} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box sx={styles.activeNavHeader}>
            <PieChartIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Reports</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={styles.activeNavSubHeader}
            href={ROUTES.DASHBOARD}
          >
            Overview
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
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
          expandIcon={<ChevronRightIcon sx={styles.activeIcon} />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Box sx={styles.activeNavHeader}>
            <PeopleIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Customers</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={styles.activeNavSubHeader}
            href={ROUTES.CUSTOMERS_LIST}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
            href={ROUTES.CUSTOMERS_ORDERS}
          >
            Orders
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
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
          expandIcon={<ChevronRightIcon sx={styles.activeIcon} />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Box sx={styles.activeNavHeader}>
            <InventoryIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Orders</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={styles.activeNavSubHeader}
            href={ROUTES.ORDER_LIST}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
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
          expandIcon={<ChevronRightIcon sx={styles.activeIcon} />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Box sx={styles.activeNavHeader}>
            <ShoppingCartIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Products</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={styles.activeNavSubHeader}
            href={ROUTES.PRODUCTS_LIST}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
            href={ROUTES.PRODUCTS_SUMMARY}
          >
            Summary
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
            href={ROUTES.PRODUCTS_INVENTORY}
          >
            Inventory
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
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
          expandIcon={<ChevronRightIcon sx={styles.activeIcon} />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Box sx={styles.activeNavHeader}>
            <ReceiptIcon sx={styles.navIcon} />
            <Typography sx={styles.navText}>Invoices</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={styles.navDetails}>
          <Button
            variant="text"
            sx={styles.activeNavSubHeader}
            href={ROUTES.INVOICE_LIST}
          >
            List
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
            href={ROUTES.INVOICE_CREATE}
          >
            Create
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
            href={ROUTES.INVOICE_DETAILS}
          >
            Details
          </Button>
          <Button
            variant="text"
            sx={styles.navSubHeader}
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
