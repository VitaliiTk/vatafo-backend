import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const UserController = {
  async getAll(_, res) {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  },
  async getUserByJWT(req, res) {
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
  },

  // обновить дынные пользователя
  async update(req, res) {
    try {
      const user = await User.findByPk(req.user.id)
      const existingAvatar = user.avatar
      // проверка на добавления уже существующего фото
      if (existingAvatar === req.imageUrl) {
        return res.json(user)
      }
      user.avatar = req.imageUrl
      await user.save()

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
      }) //  сука из за этого поля когда его не было после отправки фото фронт вис и навигация не работала на фронте до перезагрузки окна браузера, ответ нужен обязательно от сервера оказывается
    } catch (error) {
      console.log('ошибка обновления фото аватара')
      res.status(500).json({ error: 'Server error' })
    }
  },
  async getById(req, res) {
    try {
      const author = await Post.findAll({
        where: {
          user_id: req.params.id,
        },
        include: {
          model: User,
          attributes: ['id', 'username', 'avatar', 'createdAt'],
        },
      })
      res.json(author)
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  },
}
