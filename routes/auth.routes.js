import express from 'express'
import { login, registration } from '../controllers/auth.controller.js'

// middleware
import { passwordValidator } from '../middleware/passwordValidator.js'
import { usernameValidator } from '../middleware/usernameValidator.js'

const router = express.Router()

router.post('/register', usernameValidator, passwordValidator, registration) // Регистрация пользователя
router.post('/login', passwordValidator, login) // Вход пользователя

export default router
