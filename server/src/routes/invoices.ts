import express from 'express'
import { invoicesControllers } from '../controllers'
import middlewares from '../middlewares'

const router = express.Router()

router.post(
  '/create',
  middlewares.isAuth,
  middlewares.attachUser,
  invoicesControllers.createInvoiceRecord,
)

router.get(
  '/query',
  middlewares.isAuth,
  middlewares.attachUser,
  invoicesControllers.getInvoices,
)

router.get(
  '/:id',
  middlewares.isAuth,
  middlewares.attachUser,
  invoicesControllers.getInvoice,
)

router.patch(
  '/:id',
  middlewares.isAuth,
  middlewares.attachUser,
  invoicesControllers.updateInvoice,
)

export default router
