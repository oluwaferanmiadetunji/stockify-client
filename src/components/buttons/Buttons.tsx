import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

export const DarkContainedButton = ({
  text,
  styles,
  onClick,
  startIcon,
  loading,
  component,
  href,
  disabled,
}: {
  onClick?: any
  styles?: any
  text: string
  startIcon?: any
  loading?: boolean
  component?: any
  href?: string
  disabled?: boolean
}) => {
  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      component={component}
      disabled={disabled}
      href={href}
      sx={{
        color: 'rgb(17, 24, 39)',
        fontSize: 14,
        background: 'rgb(117, 130, 235)',
        textTransform: 'unset',
        fontWeight: 600,
        '&:hover': {
          background: 'rgb(17, 24, 39)',
          color: 'white',
        },
        ...styles,
      }}
      onClick={onClick}
      startIcon={startIcon}
    >
      {text}
    </LoadingButton>
  )
}

export const CancelButton = ({
  text,
  onClick,
  styles,
  loading,
  component,
  href,
}: {
  text: string
  onClick?: () => void
  styles?: any
  loading?: boolean
  component?: any
  href?: string
}) => (
  <LoadingButton
    onClick={onClick}
    component={component}
    href={href}
    sx={{
      marginRight: '10px',
      background: 'transparent',
      color: 'red',
      '&:hover': {
        background: 'rgba(209, 67, 67, 0.04)',
        color: 'red',
      },
      ...styles,
    }}
    loading={loading}
  >
    {text}
  </LoadingButton>
)
