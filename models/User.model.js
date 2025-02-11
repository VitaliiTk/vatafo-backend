import { Sequelize, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5433/vatafo'
)

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'free',
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

// Хеширование пароля перед сохранением
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})

// Метод для проверки пароля
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

export { sequelize, User }
