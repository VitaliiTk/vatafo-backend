import multer from 'multer'
import 'dotenv/config'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10000000 }
})

export const uploadSingle = upload.single('image') // Middleware для multer
