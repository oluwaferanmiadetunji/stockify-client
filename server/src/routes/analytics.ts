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
  '/sales/graph',
  middlewares.isAuth,
  middlewares.attachUser,
  analyticsControllers.getSalesGraph,
)

export default router
