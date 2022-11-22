import { useEffect, useState } from 'react'
import { Navbar } from 'reactstrap'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { ROUTES } from 'utils/constant'
import { useSession } from 'next-auth/react'
import { isValidToken } from 'utils/helpers'

export default function Home() {
  const [color, setColor] = useState('navbar-transparent')
  const { data: session, status } = useSession()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (status !== 'loading' && session != undefined) {
        //@ts-ignore
        const token = session?.accessToken || ''

        setIsAuthenticated(isValidToken(token))
      }
    })()
  }, [session, status])

  useEffect(() => {
    window.addEventListener('scroll', changeColor)
    return function cleanup() {
      window.removeEventListener('scroll', changeColor)
    }
  }, [])

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor('bg-info')
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor('navbar-transparent')
    }
  }

  return (
    <Navbar className={'fixed-top ' + color} color-on-scroll="100" expand="lg">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          padding: '10px 50px',
        }}
      >
        <div className="navbar-translate">
          <Link href={ROUTES.HOME}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              Stockify
            </Typography>
          </Link>
        </div>

        {!isAuthenticated ? (
          <Stack direction="row" spacing={2}>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              href={ROUTES.SIGNIN}
            >
              Login
            </Button>

            <Button
              color="secondary"
              variant="outlined"
              component={Link}
              href={ROUTES.SIGNUP}
            >
              Signup
            </Button>
          </Stack>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            href={ROUTES.DASHBOARD}
          >
            Dashboard
          </Button>
        )}
      </Stack>
    </Navbar>
  )
}
