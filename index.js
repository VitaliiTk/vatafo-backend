import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'

// routes
import carsRouter from './routes/cars.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(morgan('dev'))

app.use('/cars', carsRouter)

app.get('/cars', (req, res) => {
  res.send('cars')
})

app.get('/users', (req, res) => {
  res.send('users')
})

app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
