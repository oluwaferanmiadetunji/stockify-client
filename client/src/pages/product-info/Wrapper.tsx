import * as React from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import styles from './styles'
import { StyledTab, StyledTabs } from './styled'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { getAnalyticsData } from 'api/analytics'
import { useAppDispatch } from 'redux-store/hooks'

const Summary = ({ children }: any) => {
  const value = window.location.pathname === ROUTES.PRODUCTS_SUMMARY ? 0 : 1
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    newValue === 0
      ? navigate(ROUTES.PRODUCTS_SUMMARY)
      : navigate(ROUTES.PRODUCTS_SUMMARY)
  }

  React.useEffect(() => {
    ;(async () => {
      await getAnalyticsData(dispatch)
    })()
  }, [dispatch])

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

      <Box sx={{ ...styles.tabsContainer, borderColor: 'rgb(43, 47, 60)' }}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Summary" />
          {/* <StyledTab label="Sales" /> */}
        </StyledTabs>
      </Box>

      <Box sx={styles.container}>{children}</Box>
    </Layout>
  )
}

export default Summary
