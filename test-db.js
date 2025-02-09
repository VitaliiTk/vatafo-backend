import pool from './db.js'

const testDbConnection = async () => {
  try {
    const client = await pool.connect() // Пробуем подключиться
    console.log('✅ Успешное подключение к базе данных')
    client.release() // Освобождаем соединение
  } catch (err) {
    console.error('❌ Ошибка подключения к базе данных:', err.message)
  }
}

testDbConnection()
