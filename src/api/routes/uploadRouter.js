const { Router } =  require('express')
const uploadVideo = require('../controllers/upload')
const multer = require('multer')
const path = require("path")

const uploadRouter = Router()

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
      return cb(null, `./dbuzz-videos/${req.body.username}`)
  },
  filename: (req, file, cb) => {
      return cb(null, `${req.body.username}_video-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
})


uploadRouter.post('/upload', function (req, res) {
  upload.single('video')(req, res, async function (err) {
    if(err) {
      res.status(400).send({ message: 'Video Upload failed!' })
    }
    const username = req.body.username
    const data = req.file
    const result = await uploadVideo(username, data)

    res.json(result)
 })
})

module.exports = uploadRouter