import multer from 'multer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import 'dotenv/config'

const upload = multer({ storage: multer.memoryStorage() })

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

// Middleware для загрузки файла в S3
export const uploadImage = async (req, res, next) => {
  console.log('req.file:', req.file)
  try {
    if (!req.file) return next() // Если файла нет, просто продолжаем

    const file = req.file
    const fileName = `${Date.now()}-${file.originalname}`
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Доступность файла для всех очень важно чтобы отображались не сломаные картинки, это дает доступ permissions на чтение
    }

    await s3.send(new PutObjectCommand(uploadParams))

    req.imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    next()
  } catch (error) {
    console.error('Ошибка загрузки в S3:', error)
    res.status(500).json({ error: 'Ошибка загрузки изображения' })
  }
}

export const uploadSingle = upload.single('image') // Middleware для multer
