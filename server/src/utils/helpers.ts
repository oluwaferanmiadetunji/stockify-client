import randomstring from 'randomstring'
import { IInvoice } from '../types'
import { Naira } from './constants'
import moment from 'moment'
import _ from 'lodash'

export const generateRandomString = (length = 8): string =>
  randomstring.generate(length)

const deleteAtPath = (
  obj: { [x: string]: any },
  path: string | any[],
  index: number,
) => {
  if (index === path.length - 1) {
    delete obj[path[index]]
    return
  }
  deleteAtPath(obj[path[index]], path, index + 1)
}

export const toJSON = (schema: any) => {
  let transform: (arg0: any, arg1: any, arg2: any) => any

  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(
      doc: any,
      ret: { id: any; _id: { toString: () => any }; __v: any; updatedAt: any },
      options: any,
    ) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0)
        }
      })

      ret.id = ret._id.toString()
      //@ts-ignore
      delete ret._id
      delete ret.__v
      delete ret.updatedAt

      if (transform) {
        return transform(doc, ret, options)
      }
    },
  })
}

export const paginate = (schema: any) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter: any, options: any) {
    let sort = ''
    if (options.sortBy) {
      const sortingCriteria: any = []
      options.sortBy.split(',').forEach((sortOption: any) => {
        const [key, order] = sortOption.split(':')
        sortingCriteria.push((order === 'desc' ? '-' : '') + key)
      })
      sort = sortingCriteria.join(' ')
    } else {
      sort = 'createdAt'
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 100
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1
    const skip = (page - 1) * limit

    const countPromise = this.countDocuments(filter).exec()
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit)

    if (options.populate) {
      options.populate.split(',').forEach((populateOption: any) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a: any, b: any) => ({ path: b, populate: a })),
        )
      })
    }

    docsPromise = docsPromise.exec()

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values
      const totalPages = Math.ceil(totalResults / limit)
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      }
      return Promise.resolve(result)
    })
  }
}

export const stringToBoolean = (stringValue: string): Boolean | string => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false

    default:
      return stringValue
  }
}

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pickQueryParams = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign

      obj[key] = stringToBoolean(object[key])
    }

    return obj
  }, {})
}

export const removeEmptyValuesFromObject = (obj: any) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName]
    }
  }
  return obj
}

export const generateInvoiceNumber = (value?: number): string => {
  if (value) {
    const now = new Date()
    now.setSeconds(now.getSeconds() + value)

    const string = now
      .toISOString()
      .split('T')[1]
      .replace(/[^a-zA-Z0-9 ]/g, '')

    return `DNS${string}`
  } else {
    const now = new Date().toISOString()

    const string = now.split('T')[1].replace(/[^a-zA-Z0-9 ]/g, '')

    return `DNS${string}`
  }
}

export const getSumFromItems = (items: any[]) => {
  let itemsSum = 0

  for (let j = 0; j < items.length; j++) {
    itemsSum = items[j].sellingPrice * items[j].qty
  }

  return itemsSum
}

export const getPriceFromInvoice = async (
  invoices: IInvoice[],
): Promise<number> => {
  let sum = 0
  for (let i = 0; i < invoices.length; i++) {
    const itemsSum = getSumFromItems(invoices[i].items)

    sum += itemsSum
  }

  return sum
}

export const renderPriceWithCommas = (payload: number): string => {
  if (payload) {
    let data = payload.toFixed(2).toString().split('.')
    data[0] = data[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return `${Naira} ${data.join('.')}`
  }
  return `${Naira} ${0}`
}

export const getTimeRange = async (year: number) => {
  const start = new Date(year, 0, 2)
  const end = new Date(year, 11, 32)

  return Object.freeze({
    start,
    end,
  })
}

export const getMonthsTimeRange = (year: number) => {
  return [
    {
      month: 1,
      start: moment(`${year}-01-01`),
      end: moment(`${year}-01-31`),
    },
    {
      month: 2,
      start: moment(`${year}-02-01`),
      end: moment(`${year}-02-28`),
    },
    {
      month: 3,
      start: moment(`${year}-03-01`),
      end: moment(`${year}-03-31`),
    },
    {
      month: 4,
      start: moment(`${year}-04-01`),
      end: moment(`${year}-04-30`),
    },
    {
      month: 5,
      start: moment(`${year}-05-01`),
      end: moment(`${year}-05-31`),
    },
    {
      month: 6,
      start: moment(`${year}-06-01`),
      end: moment(`${year}-06-30`),
    },
    {
      month: 7,
      start: moment(`${year}-07-01`),
      end: moment(`${year}-07-31`),
    },
    {
      month: 8,
      start: moment(`${year}-08-01`),
      end: moment(`${year}-08-31`),
    },
    {
      month: 9,
      start: moment(`${year}-09-01`),
      end: moment(`${year}-09-30`),
    },
    {
      month: 10,
      start: moment(`${year}-10-01`),
      end: moment(`${year}-10-31`),
    },
    {
      month: 11,
      start: moment(`${year}-11-01`),
      end: moment(`${year}-11-30`),
    },
    {
      month: 12,
      start: moment(`${year}-12-01`),
      end: moment(`${year}-12-31`),
    },
  ]
}

export const getUniqueArray = async (array: any[], key: string) =>
  _.sortBy(_.uniqBy(array, key), [key])

export const generateYears = (
  start = new Date(2022, 0, 2).toISOString(),
  end = new Date().toISOString(),
) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setFullYear(dt.getFullYear() + 1)
  ) {
    arr.push(new Date(dt).getFullYear())
  }
  return arr
}
