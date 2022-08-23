import express from 'express'
import { storageControllers } from '../controllers'

const router = express.Router()

router.post('/file/add', storageControllers.saveFile)

export default router
