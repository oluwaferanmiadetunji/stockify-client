import express from 'express'
import { customerControllers } from '../controllers'

const router = express.Router()

router.post('/create', customerControllers.createNewCustomer)
router.get('/query', customerControllers.getCustomers)
router.get('/delete/:id', customerControllers.deleteCustomer)

export default router
