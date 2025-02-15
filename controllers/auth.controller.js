import { User } from '../models/User.model.js'
import jwt from 'jsonwebtoken'

// Регистрация пользователя
export const registration = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Электронная почта уже существует' })
    }

    const newUser = await User.create({ username, email, password })
    res
      .status(201)
      .json({ message: 'Пользователь успешно зарегистрирован', newUser })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
}

// Вход пользователя
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'incorect user data' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ error: 'incorect user data' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
}
