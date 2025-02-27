import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

// подключение к AWS S3
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export const s3Service = {
  async deleteOldAndPasteNewImage() {},

  // добавляем одну картинку в S3
  async addOneImage(req, res, next) {
    try {
      if (!req.file) return next() // Если файла нет, просто продолжаем

      const file = req.file
      const fileName = `${Date.now()}-${file.originalname}`
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' // Доступность файла для всех очень важно чтобы отображались не сломаные картинки, это дает доступ permissions на чтение
      }

      await s3.send(new PutObjectCommand(uploadParams))

      req.imageS3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

      next()
    } catch (error) {
      console.error('Ошибка загрузки в S3:', error)
      res.status(500).json({ error: 'Ошибка загрузки изображения' })
    }
  },

  async addManyImages() {},
  async deleteOneImage() {}
}
