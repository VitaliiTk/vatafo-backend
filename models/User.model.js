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
    validate: {
      isEmail: true, // Валидация формата email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('free', 'active', 'banned', 'pro'),
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

// favorite model
const Favorite = sequelize.define('Favorite', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

// синхронизация модели User с базой данных vatafo
sequelize
  .sync(/* { force: true } */) // Очищает таблицу и пересоздает если указан параметр {force: true} если {alter: true} удалит не актуальные или поеменяет их типы. если ничего не указанно просто создает если таблицы нет или соед. к уже существующей
  .then(() => console.log('База данных синхронизирована'))
  .catch((err) => console.log('Ошибка синхронизации базы данных: ', err))

export { User, Post, Favorite }
