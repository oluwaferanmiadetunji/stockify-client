import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { invoiceService, customerService, productService } from '../services'
import logger from '../config/logger'
import { removeEmptyValuesFromObject } from '../utils/helpers'
import { pickQueryParams } from '../utils/helpers'

export const createInvoiceRecord = catchAsync(async (req, res) => {
  const user = req.currentUser._id

  try {
    const customerInfo = {
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

    const invoice = await invoiceService.addInvoice({
      customer: customer.id,
      due_date: req.body.due_date,
      invoice_number: req.body.invoice_number,
      issued_date: req.body.issued_date,
      items: req.body.items,
      subject: req.body.subject,
      user,
    })

    for (let i = 0; i < req.body.items.length; i++) {
      const item = req.body.items[i]
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
