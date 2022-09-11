import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { Navigate } from 'react-router-dom'
import AuthRoute from './Auth'
import UnAuthRoute from './UnAuth'

const Login = lazy(() => import('pages/login'))
const Home = lazy(() => import('pages/home'))
const NotFound = lazy(() => import('pages/not-found'))
const ReportOverview = lazy(() => import('pages/reports/ReportOverview'))
const ReportSales = lazy(() => import('pages/reports/ReportSales'))
const Customers = lazy(() => import('pages/customers'))
const CustomerInfo = lazy(() => import('pages/customer-info'))
const CreateProduct = lazy(() => import('pages/create-product'))
const Products = lazy(() => import('pages/products'))
const ProductInfo = lazy(() => import('pages/product-info'))
const Invoices = lazy(() => import('pages/invoices'))
const GenerateInvoice = lazy(() => import('pages/generate-invoice'))
const InvoiceDetails = lazy(() => import('pages/invoice-details'))

function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          <UnAuthRoute>
            <Login />
          </UnAuthRoute>
        }
      />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <AuthRoute>
            <ReportOverview />
          </AuthRoute>
        }
      />
      <Route
        path={ROUTES.DASHBOARD_SALES}
        element={
          <AuthRoute>
            <ReportSales />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.CUSTOMERS}
        element={
          <AuthRoute>
            <Customers />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.CUSTOMERS_SUMMARY}
        element={
          <AuthRoute>
            <CustomerInfo />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCTS_CREATE}
        element={
          <AuthRoute>
            <CreateProduct />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCTS_SUMMARY}
        element={
          <AuthRoute>
            <ProductInfo />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCTS}
        element={
          <AuthRoute>
            <Products />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.INVOICE}
        element={
          <AuthRoute>
            <Invoices />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.INVOICE_CREATE}
        element={
          <AuthRoute>
            <GenerateInvoice />
          </AuthRoute>
        }
      />

      <Route
        path={ROUTES.INVOICE_DETAILS}
        element={
          <AuthRoute>
            <InvoiceDetails />
          </AuthRoute>
        }
      />

      <Route path={ROUTES.ERROR} element={<NotFound />} />
      <Route
        path={ROUTES.HOME}
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />

      <Route path="*" element={<Navigate to={ROUTES.ERROR} replace />} />
    </Routes>
  )
}

export default App
