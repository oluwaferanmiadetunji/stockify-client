import httpStatus from 'http-status'
import { Invoice } from '../models'
import ApiError from '../utils/ApiError'
import { CreateNewInvoiceType, FetchMontlynvoicesByDateRange } from '../types'
import {
  generateRandomString,
  getMonthsTimeRange,
  getTimeRange,
  getSumFromItems,
} from '../utils/helpers'
import logger from '../config/logger'
import moment from 'moment'
import _ from 'lodash'

export const addInvoice = async (body: CreateNewInvoiceType) => {
  const isInvoiceNumberExists = await Invoice.findOne({
    invoice_number: body.invoice_number,
  })

  if (isInvoiceNumberExists) {
    logger.error('Invoice number exists already')
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice number exists already')
  }

  const invoice = await Invoice.create({
    _id: generateRandomString(),
    ...body,
  })

  return invoice
}

export const queryInvoices = async (filter: any, options: any) => {
  //@ts-ignore
  const invoices = await Invoice.paginate(filter, options)
  return invoices
}

export const getInvoiceById = async (id: string) => {
  const invoice = await Invoice.findById(id)

  return invoice
}

export const getTotalCount = async (query: any): Promise<number> => {
  const count = await Invoice.countDocuments(query)

  return count
}

export const updateInvoiceById = async (
  id: string,
  payload: Partial<CreateNewInvoiceType>,
  creator: string,
) => {
  const invoice = await getInvoiceById(id)
  if (!invoice) {
    logger.error('Invoice not found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found')
  }

  if (invoice.user !== creator) {
    logger.error('Unauthorized. Unable to delete invoice')
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unable to delete invoice')
  }

  Object.assign(invoice, payload)

  if (payload.isPaid) {
    Object.assign(invoice, {
      ...payload,
      paid_on: new Date(),
    })
  }
  await invoice.save()

  return invoice
}

export const deleteInvoiceById = async (id: string) => {
  const invoice = await getInvoiceById(id)

  if (!invoice) {
    logger.error('Product not found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found')
  }
  await invoice.remove()
  return invoice
}

export const getInvoicesByQueries = async (query: any) => {
  const invoices = await Invoice.find(query).exec()

  return invoices
}

export const generateYearlyGraphData = async (user: string) => {
  const invoices = await Invoice.find({
    isPaid: true,
    user,
  }).exec()

  const graphData = []

  for (let i = 0; i < invoices.length; i++) {
    graphData.push({
      year: moment(invoices[i].paid_on).format('YYYY'),
      value: getSumFromItems(invoices[i].items),
    })
  }

  const result = _.chain(graphData)
    .groupBy('year')
    .map((group, label) => ({
      label,
      value: _.sumBy(group, 'value').toFixed(2),
    }))
    .value()

  const label = result.map((data) => data.label)
  const value = result.map((data) => data.value)

  return { label, value }
}

export const generateMontlyGraphData = async ({
  user,
  year,
}: FetchMontlynvoicesByDateRange) => {
  const { end, start } = getTimeRange(year)

  const invoices = await Invoice.find({
    isPaid: true,
    user,
    paid_on: {
      $gte: start,
      $lt: end,
    },
  }).exec()

  const months = getMonthsTimeRange(year)

  const response = []

  for (let i = 0; i < invoices.length; i++) {
    const item = invoices[i]

    for (let j = 0; j < months.length; j++) {
      const month = months[j]

      if (moment(item.paid_on).isBetween(month.start, month.end)) {
        response.push({
          month: month.month,
          data: item,
        })
      }
    }
  }

  let JanSum = 0
  let FebSum = 0
  let MarSum = 0
  let AprSum = 0
  let MaySum = 0
  let JunSum = 0
  let JulSum = 0
  let AugSum = 0
  let SepSum = 0
  let OctSum = 0
  let NovSum = 0
  let DecSum = 0

  for (let k = 0; k < response.length; k++) {
    switch (response[k].month) {
      case 1:
        JanSum += getSumFromItems(response[k].data.items)
        break
      case 2:
        FebSum += getSumFromItems(response[k].data.items)
        break
      case 3:
        MarSum += getSumFromItems(response[k].data.items)
        break
      case 4:
        AprSum += getSumFromItems(response[k].data.items)
        break
      case 5:
        MaySum += getSumFromItems(response[k].data.items)
        break
      case 6:
        JunSum += getSumFromItems(response[k].data.items)
        break
      case 7:
        JulSum += getSumFromItems(response[k].data.items)
        break
      case 8:
        AugSum += getSumFromItems(response[k].data.items)
        break
      case 9:
        SepSum += getSumFromItems(response[k].data.items)
        break
      case 10:
        OctSum += getSumFromItems(response[k].data.items)
        break
      case 11:
        NovSum += getSumFromItems(response[k].data.items)
        break
      case 12:
        DecSum += getSumFromItems(response[k].data.items)
        break
      default:
        break
    }
  }

  const graphData = [
    Number(JanSum.toFixed(2)),
    Number(FebSum.toFixed(2)),
    Number(MarSum.toFixed(2)),
    Number(AprSum.toFixed(2)),
    Number(MaySum.toFixed(2)),
    Number(JunSum.toFixed(2)),
    Number(JulSum.toFixed(2)),
    Number(AugSum.toFixed(2)),
    Number(SepSum.toFixed(2)),
    Number(OctSum.toFixed(2)),
    Number(NovSum.toFixed(2)),
    Number(DecSum.toFixed(2)),
  ]

  return graphData
}
