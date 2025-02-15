import { Favorite } from '../models/User.model.js'

export async function getFavorites(req, res) {
  console.log('Favorite > ', req.params.id)
  // брать с базы все favorites
  const data = await Favorite.findAll({
    where: {
      user_id: req.params.id,
    },
  })
  res.send(data)
}

export async function addFavorites(req, res) {
  const newFavorite = await Favorite.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  })
  res.send('add favorite')
}
