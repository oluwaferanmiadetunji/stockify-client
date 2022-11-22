export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  CUSTOMERS: '/customers',
  INVOICES: '/invoices',
  DASHBOARD_SALES: '/reports/sales',

  ORDER: '/orders',
  ORDER_SUMMARY: '/orders/summary',
  PRODUCTS: '/products',
  PRODUCTS_CREATE: '/products/new',
  PRODUCTS_SUMMARY: '/products/summary',
  PRODUCTS_INVENTORY: '/products/inventory',
  PRODUCTS_INSIGHTS: '/products/insights',
  INVOICE_CREATE: '/invoice/create',
  INVOICE_DETAILS: '/invoice/details',
  INVOICE_PREVIEW: '/invoice/preview',
  RECEIPTS: '/receipts',
  RECEIPTS_CREATE: '/receipts/create',
  RECEIPTS_DETAILS: '/receipts/details',
  RECEIPTS_PREVIEW: '/receipts/preview',
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const drawerWidth: number = 275

export const Naira = '₦'