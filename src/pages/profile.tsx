import Layout from 'components/layout'
import Box from '@mui/material/Box'
import { GetServerSideProps } from 'next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { ROUTES } from 'utils/constant'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
    padding: '0 30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  back: {
    color: 'white',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
  },
  menuButton: {
    background: '#344675',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
    color: 'white',
    '&:hover': {
      background: 'rgb(17, 24, 39)',
      color: 'white',
    },
  },
  menuItem: {
    color: 'rgb(151, 161, 186)',
  },
  menuIcon: {
    color: 'rgb(151, 161, 186)',
  },
  content: {
    width: '100%',
    marginTop: '30px',
  },

  headerText: {
    color: 'white',
    fontSize: '26px',
  },
  subHeader: {
    width: '100%',
    marginTop: '40px',
    color: 'rgb(151, 161, 186)',
    fontSize: '12px',
  },
  subHeaderText: {
    color: 'white',
  },
  divider: {
    bgcolor: 'white',
    width: '100%',
  },
  label: {
    color: 'white',
    marginBottom: '10px',
    fontSize: '14px',
  },
  value: {
    color: 'rgb(151, 161, 186)',
    fontSize: '15px',
  },
}

const Item = styled(Paper)(({ theme }: any) => ({
  backgroundColor: 'rgb(17, 24, 39)',
  ...theme.typography.body2,
  textAlign: 'left',
  color: 'white',
  borderRadius: '10px',
}))

const Profile = ({ token, customer }: any) => {
  const [data, setData] = useState<any>({})

  const { data: session } = useSession()

  const user: any = session?.user

  useEffect(() => {
    setData(customer)
  }, [customer])

  return (
    <Layout title="Customers">
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.header}>
            <Typography sx={styles.headerText}>{data?.name}</Typography>
          </Box>

          <Item>
            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.subHeaderText}>Contact Info</Typography>
            </Box>
            <Divider sx={styles.divider} />

            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.label}>Full Name</Typography>

              <Typography sx={styles.value}>{user?.user?.name}</Typography>
            </Box>

            <Divider sx={styles.divider} />

            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.label}>Email Address</Typography>

              <Typography sx={styles.value}>{user?.user?.email}</Typography>
            </Box>
          </Item>

          <Item sx={{ mt: 4 }}>
            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.subHeaderText}>Company Info</Typography>
            </Box>
            <Divider sx={styles.divider} />

            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.label}>Name</Typography>

              <Typography sx={styles.value}>{user?.company?.name}</Typography>
            </Box>

            <Divider sx={styles.divider} />

            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.label}>Phone Number</Typography>

              <Typography sx={styles.value}>{user?.company?.phone}</Typography>
            </Box>

            <Divider sx={styles.divider} />

            <Box sx={{ padding: '20px' }}>
              <Typography sx={styles.label}>Address</Typography>

              <Typography sx={styles.value}>
                {user?.company?.address}
              </Typography>
            </Box>

            {user?.company?.twitter && (
              <>
                <Divider sx={styles.divider} />
                <Box sx={{ padding: '20px' }}>
                  <Typography sx={styles.label}>Twitter</Typography>

                  <Typography sx={styles.value}>
                    {user?.company?.twitter}
                  </Typography>
                </Box>
              </>
            )}

            {user?.company?.instagram && (
              <>
                <Divider sx={styles.divider} />
                <Box sx={{ padding: '20px' }}>
                  <Typography sx={styles.label}>Instagram</Typography>

                  <Typography sx={styles.value}>
                    {user?.company?.instagram}
                  </Typography>
                </Box>
              </>
            )}
          </Item>
        </Box>
      </Box>
    </Layout>
  )
}

export default Profile

Profile.auth = true

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  // @ts-ignore
  const token = session?.accessToken

  return {
    props: { token },
  }
}
