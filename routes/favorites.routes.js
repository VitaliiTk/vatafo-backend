import express from 'express'

const router = express.Router()

import { favorites } from '../favorites.js'

router.get('/', (req, res) => {
  res.send(favorites)
})

router.get('/:id', (req, res) => {
  const userFavoritesList = favorites.filter(
    (item) => item.userId === req.params.id
  )
  res.send(userFavoritesList)
})

export default router
