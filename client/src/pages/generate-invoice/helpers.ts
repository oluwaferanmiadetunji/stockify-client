import {
  SingleProductInterface,
  CreateNewInvoiceItemInterface,
  CreateNewInvoiceInterface,
} from 'redux-store/types'
import {
  addCommasToNumber,
  renderPrice,
  removeEmptyValuesFromObject,
} from 'utils/helpers'

export const getPriceOfTotalItem = (
  quantity: number,
  product: SingleProductInterface | null,
) => {
  let sum = 0

  if (product !== null) {
    for (let i = 0; i < quantity; i++) {
      sum += product.sellingprice
    }
  }

  return addCommasToNumber(sum)
}

export const getTotalPriceOfAllItemsSelected = (
  items: CreateNewInvoiceItemInterface[],
) => {
  let sum = 0

  for (let i = 0; i < items.length; i++) {
    sum += items[i].price * items[i].qty
  }

  return renderPrice(addCommasToNumber(sum))
}

export const removeSelectedProductsFromTotalProducts = (
  selectedProducts: CreateNewInvoiceItemInterface[],
  totalProducts: SingleProductInterface[],
) => {
  if (selectedProducts.length === 0 || selectedProducts[0].name === '') {
    return totalProducts
  }

  const filteredArray = totalProducts
    .filter((product) => product.quantity > 0)
    .filter(
      (product) =>
        !selectedProducts.find((selected) => selected.productId === product.id),
    )

  return filteredArray
}

export const formatCreateInvoicePayload = (
  invoice: CreateNewInvoiceInterface,
) => {
  let payload: any = {}

  const items = []

  for (let i = 0; i < invoice.items.length; i++) {
    items.push({
      productId: invoice.items[0].productId,
      qty: invoice.items[0].qty,
    })
  }

  payload.subject = invoice.subject
  payload.invoice_number = invoice.invoice_number
  payload.customer_first_name = invoice.customer_first_name
  payload.customer_last_name = invoice.customer_last_name
  payload.customer_email = invoice.customer_email
  payload.customer_phone = invoice.customer_phone
  payload.issued_date = invoice.issued_date
  payload.due_date = invoice.due_date
  payload.notes = invoice.notes
  payload.items = items

  return removeEmptyValuesFromObject(payload)
}
