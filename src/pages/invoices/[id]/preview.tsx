import { useState, useEffect } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'
import DownloadIcon from '@mui/icons-material/Download'
import InvoicePage from './components/InvoicePage'
// import { PDFDownloadLink } from '@react-pdf/renderer'
import { ROUTES } from 'utils/constant'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { DarkContainedButton } from 'components/buttons'

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
    paddingBottom: '40px',
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
    bgcolor: 'rgb(43, 47, 60)',
    marginBottom: '5px',
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
  wrapper: {
    position: 'relative',
    background: 'white',
    padding: '40px',
    boxShadow: '0 0 17px 0 rgba(16, 40, 73, 0.09)',
  },
}

const Preview = (props: any) => {
  const [data, setData] = useState<any>({})

  const router = useRouter()

  useEffect(() => {
    setData(props.invoice)
  }, [props.invoice])

  return (
    <Layout title="Invoices">
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Button
            variant="text"
            startIcon={<KeyboardBackspaceIcon />}
            sx={styles.back}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <Box sx={styles.header}>
            <Typography sx={styles.headerText}>Invoice Preview</Typography>

            {/* <PDFDownloadLink
              document={<InvoicePage pdfMode={true} data={data} />}
              fileName={`Invoice: #${data?.invoice_number}.pdf`}
            > */}
            <DarkContainedButton text="Download" startIcon={<DownloadIcon />} />

            {/* </PDFDownloadLink> */}
          </Box>

          <Box>
            <InvoicePage data={data} />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Preview

Preview.auth = true

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
