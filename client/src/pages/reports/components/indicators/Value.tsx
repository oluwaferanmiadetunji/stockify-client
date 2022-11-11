import Stack from '@mui/material/Stack'
import { Month, Year } from './index'
import { useAppSelector } from 'redux-store/hooks'
import { selectAnalyticsState } from 'redux-store/analytics.slice'
import { Fragment } from 'react'

const Value = () => {
  const { salesGraph } = useAppSelector(selectAnalyticsState)

  return (
    <Stack direction="row" spacing={2}>
      {salesGraph.type.value === 'monthly' && <Year />}

      {salesGraph.type.value === 'daily' && (
        <Fragment>
          <Month />
          <Year />
        </Fragment>
      )}
    </Stack>
  )
}

export default Value
