import express from 'express'

import { users } from '../users.js'

const router = express.Router()

// Users root route
router.get('/', (req, res) => {
  res.send(users)
})

export default router
