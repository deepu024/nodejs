const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profiles')
  },
  filename: function (req, file, cb) {
    const mimeType = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + mimeType);
  }
})

const upload = multer({ storage: storage })


module.exports = upload