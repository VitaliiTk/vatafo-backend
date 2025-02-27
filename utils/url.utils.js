import 'dotenv/config'

export const urlUtils = {
  async getPublicUrlS3(key) {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  },
  async refactoreUrl(oldKey) {
    const url = new URL(oldKey)
    oldKey = url.pathname.substring(1)
    return oldKey
  },
  async generateNewKey(originalname) {
    return `${Date.now()}-${originalname}`
  }
}
