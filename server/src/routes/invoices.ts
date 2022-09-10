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

export default router
