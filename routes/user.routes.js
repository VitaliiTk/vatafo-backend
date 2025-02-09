// libs
import express from 'express'

// controllers
import { getAllUsers, getUser } from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)

export default router
