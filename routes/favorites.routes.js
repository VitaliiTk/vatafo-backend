import express from 'express'

// controllers
import {
  addFavorites,
  getFavorites,
} from '../controllers/favorites.controller.js'

const router = express.Router()

router.post('/', addFavorites)
router.get('/:id', getFavorites)

export default router
