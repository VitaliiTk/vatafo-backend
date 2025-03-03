import express from 'express'

import { PostController } from '../controllers/posts.controller.js'

// middlewares
import { authMiddleware } from '../middleware/auth.middleware.js'
import { uploadArray, uploadSingle } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', PostController.getAllCar)
router.get('/:id', PostController.getPostById)
router.post('/', authMiddleware, uploadArray, PostController.addNew)
router.put('/:id', authMiddleware, uploadArray, PostController.updateById)
router.delete('/:id', authMiddleware, PostController.deletePost)

export default router
