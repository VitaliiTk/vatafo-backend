import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// !нужно сделать модель обьявления
const Post = sequelize.define('Post', {
  main_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // images: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false,
  // },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  money_symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  drive_length: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // fuels: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false,
  // },
  // pay_methods: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false,
  // },
})

export { Post }
