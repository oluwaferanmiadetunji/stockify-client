import express from 'express'
import { analyticsControllers, invoicesControllers } from '../controllers'
import middlewares from '../middlewares'

const router = express.Router()

router.get(
  '/generate-number',
  middlewares.isAuth,
  middlewares.attachUser,
  // invoicesControllers.generateInvoiceNumber,
)

export default router
