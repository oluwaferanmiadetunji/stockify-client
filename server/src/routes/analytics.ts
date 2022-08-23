import express from 'express'
import { analyticsControllers } from '../controllers'
import middlewares from '../middlewares'

const router = express.Router()

router.get(
  '/reports',
  middlewares.isAuth,
  middlewares.attachUser,
  analyticsControllers.getReports,
)

export default router
