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
  // добавляем одну картинку в S3
  async addOneImage(buffer, bucketName, key, fileType) {
    try {
      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: fileType,
        ACL: 'public-read'
      }

      const command = new PutObjectCommand(uploadParams)
      const response = await s3.send(command)

      console.log('Файл загружен:', response)
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    }
  },
  // =============================================================
  // =============================================================
  // =============================================================
  // =============================================================
  // =============================================================
  // =============================================================
  // =============================================================
  // удаление из AWS S3
  async deleteOneImage(key) {
    try {
      const command = new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key })
      await s3.send(command)
      console.log(`Файл ${key} удалён`)
    } catch (error) {
      console.error('Ошибка удаления:', error)
    }
  }
}
