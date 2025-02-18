import { Favorite } from '../models/Favorite.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export async function getFavorites(req, res) {
  try {
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
    res.json(data[0].Posts)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении избранного' })
  }
}

// Добавить/удалить из избранного
export async function addFavorites(req, res) {
  const { user_id, post_id } = req.body

  try {
    const existingFavorite = await Favorite.findOne({
      where: {
        user_id,
        post_id,
      },
    })
    if (existingFavorite) {
      await existingFavorite.destroy()
      res.json({ message: 'Удалено из избранного', isFavorite: false })
    } else {
      await Favorite.create({
        user_id,
        post_id,
      })
      res.json({ message: 'Добавлено в избранное', isFavorite: true })
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при изменении избранного' })
  }
}
