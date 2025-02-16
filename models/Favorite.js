import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// favorite model
const Favorite = sequelize.define(
  'Favorite',
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['post_id', 'user_id'],
      },
    ],
  }
)

export { Favorite }
