import multer from 'multer'
import 'dotenv/config'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 }
})

export const uploadSingle = upload.single('image') // single file upload
export const uploadArray = upload.array('images[]', 10) // array of files upload
