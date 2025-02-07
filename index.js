import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('root endpoint')
})

app.listen(PORT, console.log(`Server runing on port: http://localhost:${PORT}`))
