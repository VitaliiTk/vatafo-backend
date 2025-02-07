import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'

// routes
import carsRouter from './routes/cars.routes.js'
import usersRouter from './routes/users.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

// midleware
app.use(morgan('dev'))

// index routes
app.use('/cars', carsRouter)
app.use('/users', usersRouter)

// server listening
app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
