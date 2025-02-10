import { User } from '../models/User.model.js'
import jwt from 'jsonwebtoken'

// Регистрация пользователя
export const registration = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const newUser = await User.create({ username, email, password })
    res.status(201).json({ message: 'User registered seccessfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Вход пользователя
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user.isSoftDeleted, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
