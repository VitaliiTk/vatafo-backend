import { User } from '../models/User.js'

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
      id: user.id,
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

export const changeAvatar = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    const existingAvatar = user.avatar
    // проверка на добавления уже существующего фото
    if (existingAvatar === req.body.avatar) {
      return res.send(user)
    }
    user.avatar = req.body.avatar
    await user.save()
    res.send(user) //  сука из за этого поля когда его не было после отправки фото фронт вис и навигация не работала на фронте до перезагрузки окна браузера, ответ нужен обязательно от сервера оказывается
  } catch (error) {
    console.log('ошибка обновления фото аватара')
  }
}
