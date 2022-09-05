import axios from 'axios'
import { API_ROUTES } from 'utils/constants'

export const generateInvoiceNumber = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`$${API_ROUTES.INVOICES}/generate-number`)

    return response.data
  } catch (err) {
    return null
  }
}
