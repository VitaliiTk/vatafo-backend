import { User } from '../models/User.model.js'

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      status: user.status,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
