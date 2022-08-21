import express from 'express'
import { seedersControllers } from '../controllers'

const router = express.Router()

router.post('/customers/add', seedersControllers.createRandomCustomers)

export default router
