// libs
import express from 'express'

// controllers
import {
  changeAvatar,
  getAllUsers,
  getUser,
} from '../controllers/users.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

// router.get('/', authMiddleware, getAllUsers)
router.get('/me', authMiddleware, getUser)
router.post('/avatar', authMiddleware, changeAvatar)

export default router
