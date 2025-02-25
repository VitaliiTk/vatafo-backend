// libs
import express from 'express'

// controllers
import {
  changeAvatar,
  getAllUsers,
  getUser,
  getUserById,
} from '../controllers/users.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'
import { uploadSingle, uploadImage } from '../middleware/uploadMiddleware.js'

const router = express.Router()

// router.get('/', authMiddleware, getAllUsers)
router.get('/me', authMiddleware, getUser)
router.post('/avatar', authMiddleware, uploadSingle, uploadImage, changeAvatar)
router.get('/:id', getUserById)

export default router
