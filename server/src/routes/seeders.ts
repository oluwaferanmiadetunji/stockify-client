import express from 'express'
import { seedersControllers } from '../controllers'
import middlewares from '../middlewares'

const router = express.Router()

router.post(
  '/customers/add',
  middlewares.isAuth,
  middlewares.attachUser,
  seedersControllers.createRandomCustomers,
)
router.post(
  '/products/add',
  middlewares.isAuth,
  middlewares.attachUser,
  seedersControllers.createRandomProducts,
)
router.post(
  '/invoices/add',
  middlewares.isAuth,
  middlewares.attachUser,
  seedersControllers.createRandomInvoices,
)

export default router
