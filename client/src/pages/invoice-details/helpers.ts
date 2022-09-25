import { renderPriceWithCommas, generateInvoiceNumber } from 'utils/helpers'

export const getTotalPrice = (items: any[]) => {
  let sum = 0

  for (let i = 0; i < items.length; i++) {
    sum += items[i].qty * items[i].sellingPrice
  }

  return renderPriceWithCommas(sum)
}

export const formatCreateInvoicePayload = (invoice: any) => {
  let payload: any = {}

  const items: any[] = []

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i]

    items.push({
      productId: item.product.id,
      qty: item.qty,
    })
  }

  payload.invoice_number = generateInvoiceNumber()
  payload.subject = invoice.subject
  payload.customer_first_name = invoice.customer.firstname
  payload.customer_last_name = invoice.customer.lastname
  payload.customer_email = invoice.customer.email
  payload.customer_phone = invoice.customer.phone
  payload.issued_date = invoice.issued_date
  payload.due_date = invoice.due_date
  payload.items = items
  payload.notes = invoice.notes

  return payload
}
