import express from 'express'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('root endpoint')
})

app.get('/cars', (req, res) => {
  res.send('cars')
})

app.get('users', (req, res) => {
  console.log('users')
})

app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
