require('dotenv').config()
const fleekStorage = require('@fleekhq/fleek-storage-js')
const fs = require('fs')

const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

const uploadVideo = async(username, data) => {
  const filename = data.filename
  try {
    const content = fs.readFileSync(`dbuzz-videos/${username}/${data.filename}`)
  
    const videoFile = {
      apiKey,
      apiSecret,
      key: `dbuzz-videos/${username}/${filename}`,
      data: content,
    }

    let result = await fleekStorage.upload(videoFile)

    result.hashV0 = result.hashV0.replace(/['"]+/g, '')
    const videoPath = `dbuzz-videos/${username}/${filename}`
    fs.unlinkSync(videoPath)
    console.log('file successfully removed')

    return result

  } catch(error) {
    const videoPath = `dbuzz-videos/${username}/${filename}`
    fs.unlinkSync(videoPath)
    console.log('error', error)
    return res.status(400).send({ message: 'Video Upload error has occurred' })
  }

}

module.exports = uploadVideo