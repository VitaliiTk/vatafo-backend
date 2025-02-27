import express from 'express'

import { PostController } from '../controllers/posts.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'
import { uploadSingle } from '../middleware/uploadMiddleware.js'
import { s3Service } from '../services/s3.service.js'

const router = express.Router()

router.get('/', PostController.getAllCar)
router.get('/:id', PostController.getPostById)
router.post('/', authMiddleware, uploadSingle, PostController.addNew)
router.put('/:id', authMiddleware, uploadSingle, PostController.updateById)
router.delete('/:id', authMiddleware, PostController.deletePost)

export default router
