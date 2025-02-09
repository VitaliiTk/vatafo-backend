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

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(typeof car_id)
  const car = cars.find((obj) => obj.id == id)
  if (!car) return res.status(404).send('не существует')
  res.status(200).send(car)
})

export default router
