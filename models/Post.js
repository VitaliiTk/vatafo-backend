import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// !нужно сделать модель обьявления
const Post = sequelize.define('Post', {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  money_symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stearingWheel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  drive: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payMethod: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  drive_length: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fuels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true // Проверяет, что значение состоит только из цифр
    }
  }
})

export { Post }
