import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const downloadFile = (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, 'uploads', filename)

  res.download(filePath, filename, err => {
    if (err) {
      return res.status(404).send('File not found.')
    }
  })
}
