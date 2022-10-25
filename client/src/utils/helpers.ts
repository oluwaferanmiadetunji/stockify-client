/* eslint-disable no-sparse-arrays */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker'
import { ROUTES, Naira } from './constants'
import axios from 'axios'

export const checkReportsPageIsActive = () => {
  const isReportPageActive = window.location.pathname === ROUTES.DASHBOARD
  const isReportSalesPageActive =
    window.location.pathname === ROUTES.DASHBOARD_SALES

  return { isReportPageActive, isReportSalesPageActive }
}

export const checkCustomersPageIsActive = () => {
  const isCustomerPageActive = window.location.pathname === ROUTES.CUSTOMERS

  const isCustomerSummaryPageActive =
    window.location.pathname === ROUTES.CUSTOMERS_SUMMARY

  return {
    isCustomerPageActive,
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
  const isProductCreatePageActive =
    window.location.pathname === ROUTES.PRODUCTS_CREATE

  return {
    isProductPageActive,
    isProductSummaryPageActive,
    isProductInsightPageActive,
    isProductInventoryPageActive,
    isProductCreatePageActive,
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

export const getTotalPrice = (array: any[]): number => {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i].costprice * array[i].quantity
  }
  return sum
}

export const getTotalProductCount = (array: any[]): number => {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i].quantity
  }
  return sum
}

export const renderPrice = (number: number | string): number | string => {
  if (typeof number === 'number') {
    return `${Naira} ${Number(number).toFixed(2)}`
  }

  return `${Naira} ${number}`
}
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const generateInvoiceNumber = (): string => {
  const now = new Date().toISOString()
  const string = now.split('T')[1].replace(/[^a-zA-Z0-9 ]/g, '')

  return `DNS${string}`
}

export const addCommasToNumber = (payload: number): string => {
  let data = payload.toFixed(2).toString().split('.')
  data[0] = data[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return data.join('.')
}

export const renderPriceWithCommas = (payload: number): string => {
  if (payload) {
    let data = payload.toFixed(2).toString().split('.')
    data[0] = data[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return `${Naira} ${data.join('.')}`
  }
  return `${Naira} ${0}`
}

export const removeEmptyValuesFromObject = (obj: any) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName]
    }
  }
  return obj
}

export const JSToCSS = (JS: any) => {
  let cssString = ''
  for (let objectKey in JS) {
    cssString +=
      objectKey.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) +
      ': ' +
      JS[objectKey] +
      ';\n'
  }

  return cssString
}

export const parseCSSText = (cssText: any) => {
  var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ')
  var style: any = {},
    [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt]

  var cssToJs = (s: string) =>
    s.replace(/\W+\w/g, (match: string) => match.slice(-1).toUpperCase())

  var properties = rule
    .split(';')
    .map((o: string) => o.split(':').map((x: string) => x && x.trim()))

  for (var [property, value] of properties) style[cssToJs(property)] = value

  return { cssText, style }
}

export const formatWord = (string: string): string =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
