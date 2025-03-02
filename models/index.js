import sequelize from '../config/database.js'

import { User } from './User.js'
import { Post } from './Post.js'
import { Favorite } from './Favorite.js'
import { Image } from './Image.js'

User.hasMany(Post, { foreignKey: 'user_id' })
Post.belongsTo(User, { foreignKey: 'user_id' })

User.belongsToMany(Post, { through: Favorite, foreignKey: 'user_id' })
Post.belongsToMany(User, { through: Favorite, foreignKey: 'post_id' })

Post.hasMany(Image, { foreignKey: 'post_id' })
User.hasMany(Image, { foreignKey: 'user_id' })

async function startDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ alter: true })
    console.log('All models synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { startDB }
