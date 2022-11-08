import Stack from '@mui/material/Stack'
import { Month, Year } from './index'
import { useAppSelector } from 'redux-store/hooks'
import { selectAnalyticsState } from 'redux-store/analytics.slice'

const Value = () => {
  const { salesGraph } = useAppSelector(selectAnalyticsState)

  return (
    <Stack direction="row" spacing={2}>
      {salesGraph.type.value === 'monthly' && <Month />}
      <Year />
    </Stack>
  )
}

export default Value
