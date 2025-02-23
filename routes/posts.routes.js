import express from 'express'

import { PostController } from '../controllers/posts.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', PostController.getAllCar)
router.get('/:id', PostController.getPostById)
router.post('/', authMiddleware, PostController.addNew)
router.put('/:id', authMiddleware, PostController.updateById)
router.delete('/:id', authMiddleware, PostController.deletePost)

export default router
