import express from 'express'
import { login, registration } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', registration) // Регистрация пользователя
router.post('/login', login) // Вход пользователя

export default router
