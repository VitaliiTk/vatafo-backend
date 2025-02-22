import express from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import multer from 'multer'
import 'dotenv/config'

const router = express.Router()

// Настройки AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

// Настраиваем Multer для хранения файлов в памяти
const upload = multer({ storage: multer.memoryStorage() })

// Роут для загрузки файла
router.post('/', upload.array('images', 10), async (req, res) => {
  if (!req.files) return res.status(400).json({ error: 'Файлы не найдены' })

  try {
    const uploadPromises = req.files.map((file) => {
      const fileContent = file.buffer
      const fileName = `uploads/${Date.now()}-${file.originalname}`

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
        ContentType: file.mimetype,
        // ACL: 'public-read',
        // Убираем ACL, если не требуется публичный доступ
      })

      return s3.send(command).then(() => {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
      })
    })

    const imageUrls = await Promise.all(uploadPromises)
    res.json({ imageUrls })
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    res.status(500).json({ error: 'Ошибка загрузки' })
  }
})

export default router
