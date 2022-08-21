import { faker } from '@faker-js/faker'
import { generateRandomString } from './helpers'

export const generateRandomCustomers = (count = 100): any[] => {
  const data = []

  for (let i = 0; i < count; i++) {
    const _id = generateRandomString(6)
    const name = faker.name.fullName()
    const phone = faker.phone.number()
    const email = faker.internet.email()

    data.push({ _id, name, phone, email })
  }

  return data
}
