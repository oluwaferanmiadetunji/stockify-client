import express from 'express'
import { authControllers } from '../controllers'

const router = express.Router()

router.post('/register', authControllers.createNewUser)
router.post('/login', authControllers.login)

export default router
