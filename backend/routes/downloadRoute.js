const express = require('express');
const router = express.Router();
const downloadControllers = require('../controllers/downloadControllers');


router.route('/:id').get(downloadControllers.downloadDocument);

module.exports = router;
