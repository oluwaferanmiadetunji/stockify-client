import firebaseAdmin from '../config/firebase'
import Busboy from 'busboy'
import path from 'path'
import os from 'os'
import fs from 'fs'
import config from '../config'
import catchAsync from '../utils/catchAsync'
import httpStatus from 'http-status'

export const saveFile = catchAsync(async (req, res) => {
  const busboy = Busboy({ headers: req.headers })
  let imageFileName: any = ''
  let imageToBeUploaded: any = {}
  let imageURL = ''

  busboy.on(
    'file',
    (
      fieldname: any,
      file: any,
      filename: any,
      encoding: any,
      mimetype: any,
    ) => {
      if (
        mimetype !== 'image/jpeg' &&
        mimetype !== 'image/jpg' &&
        mimetype !== 'image/png'
      ) {
        return res.status(httpStatus.BAD_REQUEST).json({
          error: 'Wrong file type submitted',
        })
      }
      const imageExtension = filename.split('.')[filename.split('.').length - 1]
      imageFileName = `${Math.round(
        Math.random() * 100000000,
      )}.${imageExtension}`
      const filepath = path.join(os.tmpdir(), imageFileName)
      imageToBeUploaded = { filepath, mimetype }
      file.pipe(fs.createWriteStream(filepath))
    },
  )

  busboy.on('finish', () => {
    firebaseAdmin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        imageURL = `https://firebasestorage.googleapis.com/v0/b/${config.firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`
      })
      .then(() => {
        return res.status(httpStatus.CREATED).json({
          message: 'Image uploaded successfully',
          url: imageURL,
        })
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          error: err.code,
        })
        console.log(err)
      })
  })
  busboy.end(req.rawBody)
})
