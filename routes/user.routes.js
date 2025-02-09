import express from 'express'

import { users } from '../users.js'

const router = express.Router()

// Users root route
router.get('/', (req, res) => {
  res.send(users)
})
// take user by user id
router.get('/:id', (req, res) => {
  const user_id = req.params.id
  console.log(user_id)
  const user = users.find((obj) => obj.id === user_id)
  if (!user) return res.send('такого user нет')
  res.send(user)
})

export default router
