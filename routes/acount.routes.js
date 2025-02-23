import express from 'express'
import { PostController } from '../controllers/posts.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/userposts', authMiddleware, PostController.getUserPosts) // получить все посты пользователя

export default router
