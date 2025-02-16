import { User } from './User.js'
import { Post } from './Post.js'
import { Favorite } from './Favorite.js'

import sequelize from '../config/database.js'

User.hasMany(Post, { foreignKey: 'user_id' })
Post.belongsTo(User, { foreignKey: 'user_id' })

User.belongsToMany(Post, { through: Favorite, foreignKey: 'user_id' })
Post.belongsToMany(User, { through: Favorite, foreignKey: 'post_id' })

async function DBinit() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync(/* { force: true } */)
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { DBinit }
