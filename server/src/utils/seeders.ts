import { faker } from '@faker-js/faker'
import _ from 'lodash'
import { generateRandomString } from './helpers'

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
    const name = faker.commerce.product()
    const supplier = faker.company.name()
    const manufacturer = faker.company.name()
    const serial_number = faker.datatype.uuid()
    const RAM = `${faker.datatype.number()} GB`
    const ROM = `${faker.datatype.number()} GB`
    const processor = faker.database.engine()
    const size = `${faker.datatype.number()} inches`
    const fingerprint = faker.datatype.boolean()
    const touch = faker.datatype.boolean()
    const dedicated = faker.datatype.boolean()
    const imei = faker.datatype.uuid()
    const color = faker.color.human()
    const battery_health = `${faker.datatype.number()} %`
    const image = faker.image.imageUrl()
    const costprice = faker.finance.amount()
    const sellingprice = faker.finance.amount()
    const quantity = faker.datatype.number()

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
    })
  }

  const uniqueData = _.uniqBy(data, 'name')

  return uniqueData
}
