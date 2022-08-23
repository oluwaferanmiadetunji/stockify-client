import express from 'express'
import authRoute from './auth'
import customersRoute from './customers'
import seedersRoute from './seeders'
import productsRoute from './products'
import storageRoute from './storage'
import analyticsRoute from './analytics'
import config from '../config'

const router = express.Router()

const Routes = [
  {
    path: '/analytics',
    route: analyticsRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/customer',
    route: customersRoute,
  },
  {
    path: '/product',
    route: productsRoute,
  },
  {
    path: '/storage',
    route: storageRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/seeder',
    route: seedersRoute,
  },
]

Routes.forEach((route) => {
  router.use(route.path, route.route)
})

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
