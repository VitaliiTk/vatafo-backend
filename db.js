// postgres pg
// подключение через pool, автоматические рассоединения или по конфигу
import pg from 'pg'
const { Pool } = pg

import 'dotenv/config'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // 5432 стандартный порт PostgreSQL
})

export default pool

// другой вариант подключения через client, но что-то не сработало нужно разбираться
// import pg from 'pg'
// const { Client } = pg

// export const client = new Client({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB,
// })
