import express from 'express'

const router = express.Router()

import { favorites } from '../favorites.js'

// controller
import { addFavorite } from '../controllers/favorites.controller.js'

router.get('/', (req, res) => {
  res.send(favorites)
})

router.post('/', addFavorite)

router.get('/:id', (req, res) => {
  const userFavoritesList = favorites.filter(
    (item) => item.userId === req.params.id
  )
  res.send(userFavoritesList)
})

export default router
