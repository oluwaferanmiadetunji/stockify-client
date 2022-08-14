import randomstring from 'randomstring'

export const generateRandomString = (length = 8): string =>
  randomstring.generate(length)

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

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
        : 10
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
