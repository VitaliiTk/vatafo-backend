// пока не использую

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5433/vatafo',
  {
    logging: false,
  }
)

export default sequelize
