import { Post } from '../models/User.model.js'

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
    const posts = await Post.findAll()
    res.send(posts)
  } catch (error) {
    console.log(error)
  }
}
