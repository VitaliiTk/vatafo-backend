import express from 'express'

// import { users } from '../users.js'

import pool from '../db.js'

const router = express.Router()

// Users root route
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.send(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Ошибка сервера')
  }
})

// take user by user id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = ${req.params.id}`
    )
    const user = result.rows[0]
    if (user) {
      return res.send(user)
    } else {
      res.send(`пользователя с id:${req.params.id} не существует`)
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Ошибка сервера')
  }
})

export default router
