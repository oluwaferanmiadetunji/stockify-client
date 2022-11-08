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

router.post(
  '/sales/graph/year',
  middlewares.isAuth,
  middlewares.attachUser,
  analyticsControllers.getSalesGraphByYear,
)

router.post(
  '/sales/graph/month',
  middlewares.isAuth,
  middlewares.attachUser,
  analyticsControllers.getSalesGraphByMonths,
)

export default router
