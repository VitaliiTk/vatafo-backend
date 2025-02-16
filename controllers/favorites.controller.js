import { Favorite } from '../models/Favorite.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export async function getFavorites(req, res) {
  // брать с базы все favorites пользователя
  const data = await User.findAll({
    where: { id: req.user.id },
    include: {
      model: Post,
      include: {
        model: User,
        attributes: ['avatar', 'status'],
      },
      through: {
        Favorite,
        attributes: [], // чтобы не выводить данные из модели Favorite
      }, // через модель Favorite (модель промежуточная)
    },
  })
  // console.log(data)
  res.json(data[0].Posts)
}

// переписать по проще и разобраться
export async function addFavorites(req, res) {
  const [favorite, created] = await Favorite.findOrCreate({
    where: {
      post_id: req.body.post_id,
      user_id: req.user.id,
    },
  })

  if (!created) {
    await Favorite.destroy({
      where: {
        post_id: req.body.post_id,
        user_id: req.user.id,
      },
    })
    return res.status(200).send('Delete from favorites')
  } else {
    return res.status(200).send('Added to favorites')
  } // создание или удаление из избранного поста для пользователя (пользователь может добавить или удалить пост из избранного)
}
