const express = require('express');
const router = express.Router();
const multer = require('multer')
const postController = require('../controllers/postController')

 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now()  + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
 })

 const upload = multer({storage})

router.route('/').post(upload.single('document') ,postController.uploadDocument);

module.exports = router;
