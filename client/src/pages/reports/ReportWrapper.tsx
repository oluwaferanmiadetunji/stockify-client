import * as React from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles, { StyledTab, StyledTabs } from './styles'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

const ReportWrapper = ({ children }: any) => {
  const [value, setValue] = React.useState(
    window.location.pathname === ROUTES.DASHBOARD ? 0 : 1,
  )
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // setValue(newValue)
    newValue === 0
      ? navigate(ROUTES.DASHBOARD)
      : navigate(ROUTES.DASHBOARD_SALES)
  }

  return (
    <Layout>
      <Typography
        variant="h5"
        sx={styles.headerText}
        gutterBottom
        component="div"
      >
        Reports
      </Typography>

      <Box sx={styles.tabsContainer}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Overview" />
          <StyledTab label="Sales" />
        </StyledTabs>
      </Box>

      <Box sx={styles.container}>{children}</Box>
    </Layout>
  )
}

export default ReportWrapper
