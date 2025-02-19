import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export async function postNewCar(req, res) {
  // console.log(req)
  // console.log(req.user)
  console.log(req.body)
  const { image, info, category, city, price, moneySymbol, ride } = req.body

  const post = await Post.create({
    main_image: image,
    info,
    category,
    city,
    price,
    user_id: req.user.id,
    money_symbol: moneySymbol,
    drive_length: ride,
  })
  res.json(post)
}

export async function getAllCar(req, res) {
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
}

export async function getUserPosts(req, res) {
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
}

export async function deletePost(req, res) {
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
}

export async function updateById(req, res) {
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
}

export async function getPostById(req, res) {
  const { id } = req.params
  try {
    const post = await Post.findOne({
      where: {
        id,
      },
    })
    res.json(post)
  } catch (error) {
    console.log(error)
  }
}
