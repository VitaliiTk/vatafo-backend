import express from 'express'

import { errorEndpoit } from '../controllers/error.controller.js'

const router = express.Router()

router.get('/', errorEndpoit)

export default router
