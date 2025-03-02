import { Favorite } from '../models/Favorite.js'
import { Image } from '../models/Image.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export async function getFavorites(req, res) {
  try {
    // брать с базы все favorites пользователя
    const data = await User.findAll({
      where: { id: req.user.id },
      include: {
        model: Post,
        include: [
          {
            model: User,
            attributes: ['avatar', 'status']
          },
          {
            model: Image, // Добавляем таблицу Image
            attributes: ['image_url'] // Укажи нужные поля
          }
        ],
        through: {
          Favorite,
          attributes: [] // чтобы не выводить данные из модели Favorite
        } // через модель Favorite (модель промежуточная)
      },
      order: [[Post, Favorite, 'createdAt', 'DESC']] // Сортировка по дате добавления в избранное
    })
    res.json(data[0]?.Posts || []) // Добавил защиту, если нет избранных постов
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении избранного' })
  }
}

// Добавить/удалить из избранного
export async function addFavorites(req, res) {
  const user_id = req.user.id
  const { post_id } = req.body

  console.log(post_id, user_id)
  console.log(req.body)

  try {
    const existingFavorite = await Favorite.findOne({
      where: {
        user_id,
        post_id
      }
    })
    if (existingFavorite) {
      console.log('Уже есть в избранном')
      await existingFavorite.destroy()
      res.json({ message: 'Удалено из избранного', isFavorite: false })
    } else {
      await Favorite.create({
        user_id,
        post_id
      })
      res.json({ message: 'Добавлено в избранное', isFavorite: true })
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при изменении избранного' })
  }
}

export async function deleteFavorite(req, res) {
  const { id } = req.params
  const user_id = req.user.id
  try {
    await Favorite.destroy({
      where: {
        post_id: id,
        user_id
      }
    })
    res.json({ message: 'Favorite deleted' })
  } catch (error) {
    console.log(error)
  }
}
