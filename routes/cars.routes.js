import express from 'express'

import { cars } from '../cars.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(cars)
})

export default router
