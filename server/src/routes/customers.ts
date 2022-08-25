import express from 'express'
import { customerControllers } from '../controllers'
import middlewares from '../middlewares'

const router = express.Router()

router.post(
  '/create',
  middlewares.isAuth,
  middlewares.attachUser,
  customerControllers.createNewCustomer,
)
router.get(
  '/query',
  middlewares.isAuth,
  middlewares.attachUser,
  customerControllers.getCustomers,
)

router.get(
  '/:id',
  middlewares.isAuth,
  middlewares.attachUser,
  customerControllers.getCustomer,
)

router.delete(
  '/:id',
  middlewares.isAuth,
  middlewares.attachUser,
  customerControllers.deleteCustomer,
)

router.patch(
  '/:id',
  middlewares.isAuth,
  middlewares.attachUser,
  customerControllers.updateCustomer,
)

export default router
