import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

// Регистрация пользователя
export const registration = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Проверяем существует ли пользователь с таким именем
    const existingUsername = await User.findOne({ where: { username } })
    if (existingUsername) {
      return res.status(400).json({ error: 'Имя пользователя уже занято' })
    }

    // Проверяем существует ли пользователь с таким email
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Такой пользователь уже существует' })
    }

    // Создаем нового пользователя
    const newUser = await User.create({ username, email, password })
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
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
      return res.status(400).json({ error: 'Пользователь не найден' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный пароль' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
      // expiresIn: '10s' // for test
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
}
