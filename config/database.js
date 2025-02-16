import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5433/vatafo'
)

export default sequelize
