import Box from '@mui/material/Box'
import ReportWrapper from './ReportWrapper'
import { Indicators } from './components'
import { useEffect, useState } from 'react'
import { getInvoicesReport } from 'api/invoices'
import { useAppDispatch } from 'redux-store/hooks'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './styles'

const ReportSales = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      // setLoading(true)

      await getInvoicesReport(dispatch)

      setLoading(false)
    })()
  }, [dispatch])

  return (
    <ReportWrapper>
      <Box>
        {loading ? (
          <Box sx={styles.loaderContainer}>
            <CircularProgress size={75} />
          </Box>
        ) : (
          <Indicators />
        )}
      </Box>
    </ReportWrapper>
  )
}

export default ReportSales
