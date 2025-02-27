import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import s3 from '../config/s3.js'
import { s3Service } from '../services/s3.service.js'
import 'dotenv/config'
import { urlUtils } from '../utils/url.utils.js'

export const PostController = {
  // добавить ноый пост
  async addNew(req, res) {
    try {
      const newPost = await Post.create({
        ...req.body,
        main_image: req.imageS3Url
      })

      res.json({ message: 'new post added successefully', newPost })
    } catch (error) {
      console.error('Ошибка сохранения продукта:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  },

  // достать все посты
  async getAllCar(req, res) {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']], // сортировка по дате создания
        include: {
          model: User,
          attributes: ['avatar', 'status']
        }
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },

  // достать все посты пользователя
  async getUserPosts(req, res) {
    console.log(req.user.id)
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']], // сортировка по дате создания по убыванию (от новых к старым)
        include: {
          model: User,
          attributes: ['avatar', 'status']
        },
        where: {
          user_id: req.user.id
        }
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },

  // удаления поста по id
  async deletePost(req, res) {
    try {
      const { id } = req.params
      let { fileKey } = req.body

      // если в теле req нету imageName то отправить ответ с текстом ошибки
      if (!fileKey || !id) return res.status(400).json({ error: 'imageName и id обязательны' })

      // чтобы удалить из s3 нужно убрать из имени файла начальный путь оставить толко относительный бакета иначе не будет удалятся
      // Убираем URL из fileKey, если он есть
      if (fileKey.startsWith('http')) {
        try {
          const url = new URL(fileKey)
          fileKey = url.pathname.substring(1)
        } catch (error) {
          return res.status(400).json({ error: 'Неверный формат fileKey' })
        }
      }

      console.log('Удаляем файл из S3:', fileKey)
      console.log('Удаляем пост с id:', id)

      // Удаление из S3 и БД одновременно
      await Promise.all([
        s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey
          })
        ),
        Post.destroy({ where: { id } })
      ])

      res.json({ message: 'Post deleted' })
    } catch (error) {
      // выввод ошибки
      console.error('Ошибка удаления:', error)
      res.status(500).json({ error: 'Ошибка удаления' })
    }
  },
  // завершение функциии удаления поста по его id
  // ==========================================================
  // ==========================================================
  // ==========================================================
  // ==========================================================
  // ==========================================================
  // ==========================================================
  // ==========================================================
  // ==========================================================

  // обновить пост по id
  // TODO: пересохранение в S3 написать
  async updateById(req, res) {
    const postId = req.params.id
    const buffer = req.file?.buffer
    console.log(req.file)
    console.log(req.body)
    try {
      const post = await Post.findByPk(postId) // находим пост в базе по primary key

      // delete old image from s3 and add new in s3 and in DB
      if (buffer) {
        let oldImage = post.main_image

        oldImage = await urlUtils.refactoreUrl(oldImage)

        s3Service.deleteOneImage(process.env.AWS_BUCKET_NAME, oldImage)

        let newImageKey = await urlUtils.generateNewKey(req.file.originalname)
        let fileType = req.file.mimetype
        await s3Service.addOneImage(buffer, process.env.AWS_BUCKET_NAME, newImageKey, fileType)

        const newS3ImageUrl = await urlUtils.getPublicUrlS3(newImageKey)

        post.main_image = newS3ImageUrl
        await post.save()
      }

      Object.assign(post, { ...req.body }) // Обновляем поля в посте при помощи деструктуризации req.body
      await post.save() // сохраняем в базу уже обнавленный пост

      res.json({ message: 'update success' })
    } catch (error) {
      console.log(error)
    }
  },

  // ============================================================
  // ============================================================
  // ============================================================
  // ============================================================
  // ============================================================
  // ============================================================
  // ============================================================
  // ============================================================
  // ============================================================
  // достать один пост по id
  async getPostById(req, res) {
    const { id } = req.params
    try {
      const post = await Post.findOne({
        where: {
          id
        },
        include: {
          model: User,
          attributes: ['avatar', 'id', 'status', 'username']
        }
      })
      res.json(post)
    } catch (error) {
      console.log(error)
    }
  }
}
