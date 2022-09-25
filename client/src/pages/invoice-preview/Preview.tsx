import { useState, useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'
import styles from './styles'
import DownloadIcon from '@mui/icons-material/Download'
import { makeSingleInvoiceRequest } from 'api/invoices'
import queryString from 'query-string'
import BounceLoader from 'react-spinners/BounceLoader'
import InvoicePage from './components/InvoicePage'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {
  selectInvoiceState,
  setSingleInvoiceData,
} from 'redux-store/invoice.slice'
import { useAppDispatch, useAppSelector } from 'redux-store/hooks'

const Preview = () => {
  const parsed: any = queryString.parse(window.location.search)
  const dispatch = useAppDispatch()
  const { invoice } = useAppSelector(selectInvoiceState)

  const [data, setData] = useState<any>(
    parsed.id === invoice?.id ? invoice : {},
  )

  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await makeSingleInvoiceRequest(parsed.id)
      dispatch(setSingleInvoiceData(response))
      setData(response)
      setLoading(false)
    })()
  }, [dispatch, parsed.id])

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            onClick={() => navigation(-1)}
          >
            Back
          </Button>
        </Box>

        {loading &&
        Object.keys(data).length === 0 &&
        data.constructor === Object ? (
          <Box sx={styles.loaderContainer}>
            <BounceLoader color="white" size={30} />
          </Box>
        ) : (
          <Box>
            <Box sx={styles.header}>
              <Typography sx={styles.headerText}>Invoice Preview</Typography>

              <PDFDownloadLink
                document={<InvoicePage pdfMode={true} data={data} />}
                fileName={`Invoice: #${data?.invoice_number}.pdf`}
              >
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ color: 'white', textTransform: 'unset' }}
                >
                  Download
                </Button>
              </PDFDownloadLink>
            </Box>

            <Box>
              <InvoicePage data={data} />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default Preview
