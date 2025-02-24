import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const PostController = {
  async addNew(req, res) {
    try {
      const newPost = await Post.create({
        ...req.body,
        main_image: req.imageUrl,
      })

      res.json({ message: 'new post added successefully', newPost })
    } catch (error) {
      console.error('Ошибка сохранения продукта:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  },
  async getAllCar(req, res) {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']], // сортировка по дате создания
        include: {
          model: User,
          attributes: ['avatar', 'status'],
        },
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },
  async getUserPosts(req, res) {
    console.log(req.user.id)
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']], // сортировка по дате создания по убыванию (от новых к старым)
        include: {
          model: User,
          attributes: ['avatar', 'status'],
        },
        where: {
          user_id: req.user.id,
        },
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },
  async deletePost(req, res) {
    const { id } = req.params
    try {
      await Post.destroy({
        where: {
          id,
        },
      })
      res.json({ message: 'Post deleted' })
    } catch (error) {
      console.log(error)
    }
  },
  async updateById(req, res) {
    const { id } = req.params
    const allBody = req.body
    console.log(allBody)
    try {
      const post = await Post.findOne({
        where: {
          id,
        },
      })
      post.info = allBody.info
      post.price = allBody.price
      post.main_image = allBody.main_image
      await post.save()
      res.json(post)
    } catch (error) {
      console.log(error)
    }
  },
  async getPostById(req, res) {
    const { id } = req.params
    try {
      const post = await Post.findOne({
        where: {
          id,
        },
        include: {
          model: User,
          attributes: ['avatar', 'id', 'status', 'username'],
        },
      })
      res.json(post)
    } catch (error) {
      console.log(error)
    }
  },
}
