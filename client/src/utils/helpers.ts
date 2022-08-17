import { faker } from '@faker-js/faker'
import { ROUTES } from './constants'

export const checkIfPageIsActive = (route: string): boolean =>
  route === window.location.pathname

export const checkIfSubPageIsActive = (
  route: string,
  parentRoute: string,
): boolean => {
  const parentRouteSplit = parentRoute.split('/')
  const routeSplit = route.split('/')

  return (
    parentRouteSplit[2] === routeSplit[2] &&
    routeSplit.length !== parentRouteSplit.length
  )
}

export const checkReportsPageIsActive = () => {
  const isReportPageActive = window.location.pathname === ROUTES.DASHBOARD
  const isReportSalesPageActive =
    window.location.pathname === ROUTES.DASHBOARD_SALES

  return { isReportPageActive, isReportSalesPageActive }
}

export const checkCustomersPageIsActive = () => {
  const isCustomerPageActive = window.location.pathname === ROUTES.CUSTOMERS
  const isCustomerOrderPageActive =
    window.location.pathname === ROUTES.CUSTOMERS_ORDERS
  const isCustomerSummaryPageActive =
    window.location.pathname === ROUTES.CUSTOMERS_SUMMARY

  return {
    isCustomerPageActive,
    isCustomerOrderPageActive,
    isCustomerSummaryPageActive,
  }
}

export const generateRandomStrings = (count: number): string[] => {
  const response: string[] = []

  for (let i = 0; i < count; i++) {
    response.push(faker.lorem.words(10))
  }

  return response
}

type CurrencyFormatter = {
  amount: number
  currency?: string
  locale?: string
}

/**
 * Formats a number into human readable currency values
 */
export function formatCurrency({
  amount,
  currency = 'NGN',
  locale = 'en',
}: CurrencyFormatter) {
  return Number(amount.toFixed(2)).toLocaleString(locale, {
    style: 'currency',
    currency,
  })
}

export const generateCustomers = (count = 10) => {
  const response: any[] = []

  for (let i = 0; i < count; i++) {
    response.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      created: new Date(faker.date.past()).toISOString(),
    })
  }

  return response
}
