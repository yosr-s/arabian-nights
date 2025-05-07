const express = require('express');
const router = express.Router();
const { createWish, getWishes } = require('../controllers/wishController');
const upload = require('../services/uploadService');


//!router.post('/', upload.single('media'), createWish);
router.post('/', createWish); // plus besoin de upload.single()

router.get('/', getWishes);

module.exports = router;
