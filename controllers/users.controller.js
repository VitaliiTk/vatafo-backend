import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import s3 from '../config/s3.js'
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
  // =========================================================

  // =========================================================
  // обновить дынные пользователя
  async update(req, res) {
    try {
      if (!req.file) return res.json({ message: 'image не заполнен' })
      if (!req.body.username)
        return res.json({
          message: 'username не заполнен',
        })

      if (!req.body.email)
        return res.json({
          message: 'email не заполнен',
        })

      // находим loged User в базе
      const user = await User.findByPk(req.user.id)
      if (!user) {
        return res.status(404).json({ error: 'User не найден' })
      }

      // 1. Найти старый fileKey в базе данных
      let oldFileKey = user.avatar

      if (oldFileKey.startsWith('http')) {
        try {
          const url = new URL(oldFileKey)
          oldFileKey = url.pathname.substring(1)
        } catch (error) {
          return res.status(400).json({ error: 'Неверный формат fileKey' })
        }
      }

      // 2. Удалить старую картинку из S3
      if (oldFileKey) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: oldFileKey,
          })
        )
        console.log('Удалена старая картинка:', oldFileKey)
      }

      // 3. Загрузить новую картинку
      const newFileKey = `${Date.now()}-${req.file.originalname}`
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: newFileKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          ACL: 'public-read', // доступ к файлам обязательно
        })
      )

      // 4. Обновить запись в БД
      const s3ImageURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFileKey}`

      user.avatar = s3ImageURL
      user.username = req.body.username
      user.email = req.body.email

      await user.save()

      // ответ от сервера
      res.json({ message: 'profile successefully update' }) // test
    } catch (error) {
      console.log('ошибка обновления фото аватара')
      res.status(500).json({ error: 'Server error' })
    }
  },
  // ==============================================================

  // ==============================================================
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
