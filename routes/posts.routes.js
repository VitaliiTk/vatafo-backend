import express from 'express'

import {
  deletePost,
  getAllCar,
  getPostById,
  addNew,
  updateById,
} from '../controllers/posts.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getAllCar)
router.get('/:id', getPostById)
router.post('/', authMiddleware, addNew)
router.put('/:id', authMiddleware, updateById)
router.delete('/:id', authMiddleware, deletePost)

export default router
