import { faker } from '@faker-js/faker'
import _ from 'lodash'
import { generateRandomString, generateInvoiceNumber } from './helpers'
import { CreateNewInvoiceType } from '../types'

export const generateRandomCustomers = (user: string, count = 100): any[] => {
  const data = []

  for (let i = 0; i < count; i++) {
    const _id = generateRandomString(6)
    const firstname = faker.name.firstName()
    const lastname = faker.name.lastName()
    const phone = faker.phone.number()
    const email = faker.internet.email()

    data.push({ _id, firstname, phone, email, user, lastname })
  }

  return data
}

export const generateRandomProducts = (user: string, count = 100): any[] => {
  const data = []

  for (let i = 0; i < count; i++) {
    const _id = generateRandomString(6)
    const name = faker.commerce.productName()
    const supplier = faker.company.name()
    const manufacturer = faker.company.name()
    const serial_number = faker.datatype.uuid()
    const RAM = `${faker.datatype.number({ min: 4, max: 128 })} GB`
    const ROM = `${faker.datatype.number({
      min: 64,
      max: 1024,
    })} GB`
    const processor = faker.database.engine()
    const size = `${faker.datatype.number({
      min: 6,
      max: 24,
    })} inches`
    const fingerprint = faker.datatype.boolean()
    const touch = faker.datatype.boolean()
    const dedicated = faker.datatype.boolean()
    const imei = faker.datatype.uuid()
    const color = faker.color.human()
    const battery_health = `${faker.datatype.number({ min: 60, max: 100 })} %`
    const image = faker.image.imageUrl()
    const costprice = faker.finance.amount(20000, 50000, 2)
    const sellingprice = faker.finance.amount(50000, 100000, 2)
    const quantity = faker.datatype.number({
      max: 20,
      min: 3,
    })
    const category = faker.lorem.word(5)

    data.push({
      _id,
      name,
      supplier,
      manufacturer,
      serial_number,
      RAM,
      ROM,
      processor,
      size,
      fingerprint,
      touch,
      dedicated,
      imei,
      color,
      battery_health,
      image,
      costprice,
      user,
      quantity,
      sellingprice,
      category,
    })
  }

  const uniqueData = _.uniqBy(data, 'name')

  return uniqueData
}

export const generateRandomInvoices = async (
  user: string,
  count = 100,
  products: any[],
  customers: any[],
) => {
  const data = []

  for (let i = 0; i < count; i++) {
    console.log(`Generating ${i + 1} of ${count} invoices`)

    let items = []
    const _id = generateRandomString(6)
    const invoice_number = generateInvoiceNumber()
    const subject = faker.lorem.words(4)
    const customer = customers[Math.floor(Math.random() * customers.length)]._id
    const issued_date = new Date().toISOString()
    const due_date = new Date(
      new Date().setDate(new Date().getDate() + 10),
    ).toISOString()
    const notes = faker.lorem.sentences(5, '\n')

    for (let i = 0; i < 3; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      items.push({
        productId: product._id,
        qty: faker.datatype.number({ min: 1, max: 4 }),
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
      })
    }

    data.push({
      _id,
      subject,
      invoice_number,
      customer,
      issued_date,
      due_date,
      items: items,
      notes,
      user,
    })
  }

  return data
}
