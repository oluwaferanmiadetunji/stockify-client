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
import { useAppSelector } from 'redux-store/hooks'
import { selectAuthState } from 'redux-store/auth.slice'
import InvoicePage from './components/InvoicePage'
import { PDFDownloadLink } from '@react-pdf/renderer'

const Preview = () => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()
  const parsed: any = queryString.parse(window.location.search)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await makeSingleInvoiceRequest(parsed.id)
      setData(response)
      setLoading(false)
    })()
  }, [parsed.id])

  const { user } = useAppSelector(selectAuthState)

  const downloadInvoice = async () => {}

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

        {loading ? (
          <Box sx={styles.loaderContainer}>
            <BounceLoader color="white" size={30} />
          </Box>
        ) : (
          <Box>
            <Box sx={styles.header}>
              <Typography sx={styles.headerText}>Invoice Preview</Typography>

              <PDFDownloadLink
                document={<InvoicePage pdfMode={true} />}
                fileName={`Invoice: #${data?.invoice_number}.pdf`}
              >
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ color: 'white', textTransform: 'unset' }}
                  onClick={downloadInvoice}
                >
                  Download
                </Button>
              </PDFDownloadLink>
            </Box>

            <Box>
              <InvoicePage />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default Preview
