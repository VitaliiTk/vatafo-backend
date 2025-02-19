import express from 'express'

import {
  deletePost,
  getAllCar,
  getPostById,
  postNewCar,
  updateById,
} from '../controllers/posts.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getAllCar)
router.get('/:id', authMiddleware, getPostById)
router.post('/', authMiddleware, postNewCar)
router.delete('/:id', authMiddleware, deletePost)
router.put('/:id', authMiddleware, updateById)

export default router
