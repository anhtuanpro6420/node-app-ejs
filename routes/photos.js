const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos');

router.post('/search', photosController.search);

router.get('/:photoId', photosController.getDetail);

module.exports = router;
