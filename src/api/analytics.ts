import axios from 'axios'
import { API_ROUTES } from 'utils/constant'
import {
  setSalesGraphData,
  setSalesGraphLoading,
} from 'redux-store/analytics.slice'

export const getDailySalesgraph = async (
  month: string,
  year: number,
  dispatch: any,
  token: string,
) => {
  try {
    dispatch(setSalesGraphLoading(true))
    const response = await axios.post(
      API_ROUTES.ANALYTICS_DAILY_SALES_GRAPH,
      {
        year,
        month,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    dispatch(setSalesGraphLoading(false))

    dispatch(setSalesGraphData(response.data))
  } catch (err) {}
}

export const getMonthlySalesgraph = async (
  year: number,
  dispatch: any,
  token: string,
) => {
  try {
    dispatch(setSalesGraphLoading(true))
    const response = await axios.post(
      API_ROUTES.ANALYTICS_MONTHLY_SALES_GRAPH,
      {
        year,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    dispatch(setSalesGraphLoading(false))

    dispatch(setSalesGraphData(response.data))
  } catch (err) {}
}

export const getYearlySalesgraph = async (dispatch: any, token: string) => {
  try {
    dispatch(setSalesGraphLoading(true))
    const response = await axios.post(
      API_ROUTES.ANALYTICS_YEARLY_SALES_GRAPH,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    dispatch(setSalesGraphLoading(false))
    dispatch(setSalesGraphData(response.data))
  } catch (err) {}
}
