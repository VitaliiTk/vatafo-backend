import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import s3 from '../config/s3.js'
import { s3Service } from '../services/s3.service.js'
import 'dotenv/config'
import { urlUtils } from '../utils/url.utils.js'
import { Image } from '../models/Image.js'

export const PostController = {
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // добавить ноый пост
  async addNew(req, res) {
    try {
      // const file = req.file
      const user_id = req.user.id
      const mainImage = req.files[0]
      const images = req.files
      console.log(req.body)
      console.log(images)

      const newPost = await Post.create({
        ...req.body
      })
      //TODO: one image from images must be upload in DB table posts in main_image column

      //TODO: map images and upload in S3, then return url from s3 and write in DB images table
      await Promise.all(
        images.map(async (image, index) => {
          const newImageS3Url = await urlUtils.generateNewKey(image.originalname)
          await s3Service.addOneImage(image.buffer, process.env.AWS_BUCKET_NAME, newImageS3Url, image.mimetype)
          const publicS3Url = await urlUtils.getPublicUrlS3(newImageS3Url)

          await Image.create({ user_id, post_id: newPost.id, image_url: publicS3Url })
        })
      )

      res.json({ message: 'new post added successefully', newPost })
    } catch (error) {
      console.error('Ошибка сохранения продукта:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  },
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // достать все посты
  async getAllCar(req, res) {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']], // сортировка по дате создания
        include: [
          {
            model: User,
            attributes: ['avatar', 'status']
          },
          {
            model: Image,
            attributes: ['image_url']
          }
        ]
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================
  // ===========================================================================================================

  // достать все посты пользователя
  async getUserPosts(req, res) {
    console.log(req.user.id)
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']], // сортировка по дате создания по убыванию (от новых к старым)
        include: [
          {
            model: User,
            attributes: ['avatar', 'status']
          },
          {
            model: Image,
            attributes: ['image_url']
          }
        ],
        where: {
          user_id: req.user.id
        }
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },
  // ====================================================
  // ====================================================
  // ====================================================
  // ====================================================
  // ====================================================
  // удаления поста по id
  async deletePost(req, res) {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'id обязательны' })

      // find in post DB by id from params
      const post = await Post.findByPk(id)
      // find all post images in Image table and delete
      const allPostImages = await Image.findAll({ where: { post_id: id } })
      await Promise.all(
        allPostImages.map(async (image) => {
          const refactoredImageUrlForS3 = await urlUtils.refactoreUrl(image.image_url)
          await s3Service.deleteOneImage(refactoredImageUrlForS3)
          await Image.destroy({ where: { id: image.id } })
        })
      )
      await post.destroy()

      // Удаление из S3 и БД одновременно

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
  // TODO: нужно также сделать загрузку массива картинок в базу и в S3
  // FIXME: покачто ошибка из за не совпадающих полей от клиента и только один файл
  async updateById(req, res) {
    const postId = req.params.id
    const files = req.files
    console.log(files)
    console.log(req.body)
    try {
      const post = await Post.findByPk(postId) // находим пост в базе по primary key

      if (files.length > 0) {
        console.log(`>>>>>>> files amount is: ${files.length}`)

        await Promise.all(
          files.map(async (image) => {
            let newImageKey = await urlUtils.generateNewKey(image.originalname)
            let fileType = image.mimetype
            await s3Service.addOneImage(image.buffer, process.env.AWS_BUCKET_NAME, newImageKey, fileType)
            const newS3ImageUrl = await urlUtils.getPublicUrlS3(newImageKey)
            await Image.create({ user_id: req.user.id, post_id: post.id, image_url: newS3ImageUrl })
          })
        )
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
        include: [
          {
            model: User,
            attributes: ['avatar', 'id', 'status', 'username']
          },
          {
            model: Image,
            attributes: ['image_url', 'id']
          }
        ]
      })
      res.json(post)
    } catch (error) {
      console.log(error)
    }
  },

  // =============================================================
  // =============================================================
  // =============================================================
  // delete image by id
  async deleteImageById(req, res) {
    const image_id = req.params.id
    try {
      await Image.destroy({ where: { id: image_id } })

      res.json({ message: `image with id: ${image_id} delete success` })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}
