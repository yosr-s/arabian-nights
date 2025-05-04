// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../services/uploadService');
const { uploadGallery, getGallery } = require('../controllers/galleryController');

router.post('/', upload.array('media', 10), uploadGallery); // jusqu'à 10 fichiers
router.get('/', getGallery);

module.exports = router;
