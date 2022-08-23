import express from 'express'
import middlewares from '../middlewares'
import { productsControllers } from '../controllers'

const router = express.Router()

router.post(
  '/create',
  middlewares.isAuth,
  middlewares.attachUser,
  productsControllers.createNewProduct,
)
router.get(
  '/query',
  middlewares.isAuth,
  middlewares.attachUser,
  productsControllers.getProducts,
)
router.get(
  '/delete/:id',
  middlewares.isAuth,
  middlewares.attachUser,
  productsControllers.deleteProduct,
)

export default router
