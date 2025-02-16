import express from 'express'

import { authMiddleware } from '../middleware/auth.middleware.js'
// controllers
import {
  addFavorites,
  getFavorites,
} from '../controllers/favorites.controller.js'

const router = express.Router()

router.post('/', authMiddleware, addFavorites)
router.get('/', authMiddleware, getFavorites)

export default router
