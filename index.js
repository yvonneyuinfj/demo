import express from 'express'
import { upload } from './upload.js'
import { downloadFile } from './download.js'
import { convertFile } from './pandoc.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 8099
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.post('/upload', upload.single('file'), async (req, res) => {
  // console.log(req.file)
  // res.send('File uploaded successfully.')
  try {
    const sourceFilePath = path.join(__dirname, 'uploads', req.file.filename)
    const targetFilePath = path.join(
      __dirname,
      'converted',
      req.file.filename.replace('.docx', '.md')
    )
    const options = {
      sourceType: 'docx',
      sourceFilePath,
      targetType: 'markdown',
      targetFilePath,
    }
    await convertFile(options)
    const downloadLink = `/downloaded/${encodeURIComponent(
      req.file.filename.replace('.docx', '.md')
    )}`
    res.json({ downloadLink })
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/download/:filename', downloadFile)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
