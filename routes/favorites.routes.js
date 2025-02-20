import express from 'express'

import { authMiddleware } from '../middleware/auth.middleware.js'
// controllers
import {
  addFavorites,
  deleteFavorite,
  getFavorites,
} from '../controllers/favorites.controller.js'

const router = express.Router()

router.get('/', authMiddleware, getFavorites)
router.post('/', authMiddleware, addFavorites)
router.delete('/:id', authMiddleware, deleteFavorite)

export default router
