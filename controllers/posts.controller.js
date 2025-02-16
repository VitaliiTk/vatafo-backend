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
  res.send('Ответ от post /posts')
}

export async function getAllCar(req, res) {
  try {
    const posts = await Post.findAll({
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
