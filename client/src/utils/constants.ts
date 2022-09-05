export const ROUTES = {
  LOGIN: '/auth/login',
  ERROR: '/404',
  HOME: '/',

  DASHBOARD: '/dashboard/reports',
  DASHBOARD_SALES: '/dashboard/reports/sales',
  CUSTOMERS: '/dashboard/customers',
  CUSTOMERS_SUMMARY: '/dashboard/customers/info',

  ORDER: '/dashboard/orders',
  ORDER_SUMMARY: '/dashboard/orders/summary',

  PRODUCTS: '/dashboard/products',
  PRODUCTS_CREATE: '/dashboard/products/new',
  PRODUCTS_SUMMARY: '/dashboard/products/summary',
  PRODUCTS_INVENTORY: '/dashboard/products/inventory',
  PRODUCTS_INSIGHTS: '/dashboard/products/insights',

  INVOICE: '/dashboard/invoice',
  INVOICE_CREATE: '/dashboard/invoice/create',
  INVOICE_DETAILS: '/dashboard/invoice/details',
  INVOICE_PREVIEW: '/dashboard/invoice/preview',

  RECEIPTS: '/dashboard/receipts',
  RECEIPTS_CREATE: '/dashboard/receipts/create',
  RECEIPTS_DETAILS: '/dashboard/receipts/details',
  RECEIPTS_PREVIEW: '/dashboard/receipts/preview',
}

export const API_URL = process.env.REACT_APP_API_URL

export const API_ROUTES = {
  LOGIN: '/auth/login',
  CUSTOMERS: '/customer',
  PRODUCTS: '/product',
  ANALYTICS_REPORTS: '/analytics/reports',
  INVOICES: '/invoices',
}

export const Naira = '₦'
