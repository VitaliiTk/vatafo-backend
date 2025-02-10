import { sequelize } from './User.model.js'

sequelize
  .sync({ force: true }) // Очищает таблицу и пересоздает
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database: ', err))
