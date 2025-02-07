import express from 'express'

const router = express.Router()

// Users root route
router.get('/', (req, res) => {
  res.send('Users root route')
})

export default router
