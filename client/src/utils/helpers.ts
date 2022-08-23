import { faker } from '@faker-js/faker'
import { ROUTES } from './constants'
import axios from 'axios'

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

export const checkOrderPageIsActive = () => {
  const isOrderPageActive = window.location.pathname === ROUTES.ORDER

  const isOrderSummaryPageActive =
    window.location.pathname === ROUTES.ORDER_SUMMARY

  return {
    isOrderPageActive,
    isOrderSummaryPageActive,
  }
}

export const checkProductPageIsActive = () => {
  const isProductPageActive = window.location.pathname === ROUTES.PRODUCTS

  const isProductSummaryPageActive =
    window.location.pathname === ROUTES.PRODUCTS_SUMMARY
  const isProductInsightPageActive =
    window.location.pathname === ROUTES.PRODUCTS_INSIGHTS
  const isProductInventoryPageActive =
    window.location.pathname === ROUTES.PRODUCTS_INVENTORY

  return {
    isProductPageActive,
    isProductSummaryPageActive,
    isProductInsightPageActive,
    isProductInventoryPageActive,
  }
}

export const checkInvoicePageIsActive = () => {
  const isInvoicePageActive = window.location.pathname === ROUTES.INVOICE

  const isInvoiceCreatePageActive =
    window.location.pathname === ROUTES.INVOICE_CREATE
  const isInvoiceDetailsPageActive =
    window.location.pathname === ROUTES.INVOICE_DETAILS
  const isInvoicePreviewPageActive =
    window.location.pathname === ROUTES.INVOICE_PREVIEW

  return {
    isInvoicePageActive,
    isInvoiceCreatePageActive,
    isInvoiceDetailsPageActive,
    isInvoicePreviewPageActive,
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

export const generateImageTag = (): string => faker.datatype.uuid()

export const saveToken = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
