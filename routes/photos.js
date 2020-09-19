const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos');

router.post('/search', photosController.search);

module.exports = router;
