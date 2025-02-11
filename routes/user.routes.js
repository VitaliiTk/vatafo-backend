// libs
import express from 'express'

// controllers
import { getAllUsers, getUser } from '../controllers/users.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

// router.get('/', authMiddleware, getAllUsers)
router.get('/me', authMiddleware, getUser)

export default router
