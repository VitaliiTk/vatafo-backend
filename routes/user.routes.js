// libs
import express from 'express'

// controllers
import { UserController } from '../controllers/users.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'
import { uploadSingle } from '../middleware/uploadMiddleware.js'
import multer from 'multer'

const router = express.Router()

// router.get('/', authMiddleware, UserController.getAll)
router.get('/me', authMiddleware, UserController.getUserByJWT)
router.post('/me', authMiddleware, uploadSingle, UserController.update)
router.get('/:id', UserController.getById)

// error handler from multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'файл слишком большой'
      })
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'превышен лимит загрузки файлов'
      })
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'только jpeg формат'
      })
    }
  }
})

export default router
