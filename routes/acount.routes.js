import express from 'express'
import { getUserPosts } from '../controllers/posts.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/userposts', authMiddleware, getUserPosts) // получить все посты пользователя

export default router
