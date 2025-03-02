import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// favorite model
const Image = sequelize.define('Image', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

export { Image }
