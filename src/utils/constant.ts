import { GRAPH_OPTIONS_TYPE } from 'utils/types'

export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  CUSTOMERS: '/customers',
  INVOICES: '/invoices',
  INVOICES_CREATE: '/invoices/new',
  PRODUCTS: '/products',
  PRODUCTS_CREATE: '/products/new',
  USERS: '/users',
  PROFILE: '/profile',
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const drawerWidth: number = 275

export const Naira = '₦'

export const GRAPH_OPTIONS: GRAPH_OPTIONS_TYPE[] = [
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Monthly',
    value: 'monthly',
  },
  {
    label: 'Yearly',
    value: 'yearly',
  },
]

export const API_ROUTES = {
  ANALYTICS_REPORTS: '/analytics/reports',
  ANALYTICS_MONTHLY_SALES_GRAPH: '/analytics/sales/graph/month',
  ANALYTICS_YEARLY_SALES_GRAPH: '/analytics/sales/graph/year',
  ANALYTICS_DAILY_SALES_GRAPH: '/analytics/sales/graph/daily',
}

export const ROLES = {
  ADMIN: 'adm',
  USER: 'usr',
}
