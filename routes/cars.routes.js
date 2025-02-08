import express from 'express'

import { cars } from '../cars.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(cars)
})

router.get('/brands', (req, res) => {
  const brandsWithCars = ['All', ...new Set(cars.map((item) => item.brand))]
  res.send(brandsWithCars)
})

export default router
