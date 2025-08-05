const multer = require('multer')
const path = require('path')
const sharp = require('sharp')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
})

const processImage = async (req, res, next) => {
  if (!req.file) return next()

  try {
    const filename = req.file.filename
    const filepath = path.join(process.env.UPLOAD_PATH, filename)
    
    await sharp(filepath)
      .resize(1080, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(path.join(process.env.UPLOAD_PATH, 'processed-' + filename))
    
    req.file.filename = 'processed-' + filename
    req.file.path = '/uploads/' + req.file.filename
    
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { upload, processImage }