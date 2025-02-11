// libs
import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'

// routes
import usersRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import errorRouter from './routes/error.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

// midleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// index routes
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/*', errorRouter)

// server listening
app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
