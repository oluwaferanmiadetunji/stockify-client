import { faker } from '@faker-js/faker'

export const checkIfPageIsActive = (route: string) => {
  return route === window.location.pathname
}

export const generateRandomStrings = (count: number): string[] => {
  const response: string[] = []

  for (let i = 0; i < count; i++) {
    response.push(faker.lorem.words(10))
  }

  return response
}
