import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'

// routes
import carsRouter from './routes/cars.routes.js'
import usersRouter from './routes/user.routes.js'
import favoritesRouter from './routes/favorites.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

// midleware
app.use(morgan('dev'))
app.use(cors())

// index routes
app.use('/users', usersRouter)
app.use('/cars', carsRouter)
app.use('/favorites', favoritesRouter)

// server listening
app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
