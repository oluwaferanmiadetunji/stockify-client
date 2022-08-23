import { faker } from '@faker-js/faker'
import { generateRandomString } from './helpers'

export const generateRandomCustomers = (user: string, count = 100): any[] => {
  const data = []

  for (let i = 0; i < count; i++) {
    const _id = generateRandomString(6)
    const name = faker.name.fullName()
    const phone = faker.phone.number()
    const email = faker.internet.email()

    data.push({ _id, name, phone, email, user })
  }

  return data
}

export const generateRandomProducts = (user: string, count = 100): any[] => {
  const data = []

  for (let i = 0; i < count; i++) {
    const _id = generateRandomString(6)
    const name = faker.name.fullName()
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
    const price = faker.finance.amount()

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
      price,
      user,
    })
  }

  return data
}
