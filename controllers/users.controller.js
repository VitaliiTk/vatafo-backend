import pool from '../db.js'

export const getAllUsers = async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.send(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const getUser = async (req, res) => {
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
}
