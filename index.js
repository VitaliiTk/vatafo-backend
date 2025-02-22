// libs
import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'
import { startDB } from './models/index.js'

// routes
import usersRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import errorRouter from './routes/error.routes.js'
import postsRouter from './routes/posts.routes.js'
import favoritesRouter from './routes/favorites.routes.js'
import acountPostsRouter from './routes/acount.routes.js'

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
app.use('/posts', postsRouter)
app.use('/acount', acountPostsRouter)
app.use('/favorites', favoritesRouter)
app.use('/*', errorRouter)

//TODO: Digital Ocean S3

// server listening
try {
  startDB()
  app.listen(
    PORT,
    console.log(`Server runing on port: http://localhost:${PORT}`)
  )
} catch (error) {
  console.log(error)
}
