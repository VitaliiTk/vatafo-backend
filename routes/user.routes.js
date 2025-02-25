// libs
import express from 'express'

// controllers
import { UserController } from '../controllers/users.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'
import { uploadSingle, uploadImage } from '../middleware/uploadMiddleware.js'

const router = express.Router()

// router.get('/', authMiddleware, UserController.getAll)
router.get('/me', authMiddleware, UserController.getUserByJWT)
router.post(
  '/avatar',
  authMiddleware,
  uploadSingle,
  uploadImage,
  UserController.update
)
router.get('/:id', UserController.getById)

export default router
