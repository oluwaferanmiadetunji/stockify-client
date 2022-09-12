import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { invoiceService, customerService, productService } from '../services'
import logger from '../config/logger'
import { removeEmptyValuesFromObject } from '../utils/helpers'
import { pickQueryParams } from '../utils/helpers'

export const createInvoiceRecord = catchAsync(async (req, res) => {
  const user = req.currentUser._id

  try {
    const customerInfo: any = {
      firstname: req.body.customer_first_name,
      lastname: req.body.customer_last_name,
      phone: req.body.customer_phone,
      email: req.body.customer_email,
    }

    let customer = await customerService.getCustomersByQuery(
      removeEmptyValuesFromObject(customerInfo),
    )

    if (!customer) {
      customer = await customerService.createCustomer(customerInfo)
    }

    const items = []

    for (let i = 0; i < req.body.items.length; i++) {
      const product: any = await productService.getProductById(
        req.body.items[i].productId,
      )

      items.push({
        qty: req.body.items[i].qty,
        productId: req.body.items[i].productId,
        costPrice: product.costprice,
        sellingPrice: product.sellingprice,
      })
    }

    const invoice = await invoiceService.addInvoice({
      customer: customer.id,
      due_date: req.body.due_date,
      invoice_number: req.body.invoice_number,
      issued_date: req.body.issued_date,
      items,
      subject: req.body.subject,
      user,
      notes: req.body.notes,
    })

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const product: any = await productService.getProductById(item.productId)

      await productService.updateProductById(
        item.productId,
        {
          quantity: product?.quantity - item.qty,
        },
        product.user,
      )
    }

    return res.status(httpStatus.CREATED).send(invoice)
  } catch (error) {
    logger.error('Error: ', JSON.stringify(error))
    //@ts-ignore
    console.log(error)

    return res
      .status(httpStatus.CONFLICT)
      .json({ message: 'Error creating record' })
  }
})

export const getInvoices = catchAsync(async (req, res) => {
  const filter = pickQueryParams(req.query, ['name'])
  const options = pickQueryParams(req.query, [
    'sortBy',
    'limit',
    'page',
    'user',
  ])
  const result = await invoiceService.queryInvoices(filter, options)

  res.status(httpStatus.OK).send(result)
})

export const getInvoice = catchAsync(async (req, res) => {
  let invoice: any = await invoiceService.getInvoiceById(req.params.id)

  let itemDetails = []

  for (let i = 0; i < invoice.items.length; i++) {
    const product = await productService.getProductById(
      invoice.items[i].productId,
    )

    itemDetails.push({
      qty: invoice.items[i].qty,
      costPrice: invoice.items[i].costPrice,
      sellingPrice: invoice.items[i].sellingPrice,
      product,
    })
  }

  const customer = await customerService.getCustomerById(invoice.customer)

  delete invoice._doc['items']
  invoice._doc.items = itemDetails
  invoice._doc.customer = customer

  return res.status(httpStatus.OK).send(invoice)
})
