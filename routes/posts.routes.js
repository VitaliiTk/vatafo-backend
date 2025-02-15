import express from 'express'

import { getAllCar, postNewCar } from '../controllers/posts.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getAllCar)
router.post('/', authMiddleware, postNewCar)

export default router
