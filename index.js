import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'

const app = express()

const PORT = process.env.PORT || 3000

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('root endpoint')
})

app.get('/cars', (req, res) => {
  res.send('cars')
})

app.get('/users', (req, res) => {
  res.send('users')
})

app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
