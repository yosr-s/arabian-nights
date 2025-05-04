// controllers/galleryController.js
const Gallery = require('../models/Gallery');

exports.uploadGallery = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No media files uploaded' });
    }

    const entries = files.map(file => ({
      title: file.originalname,
      mediaType: file.mimetype.startsWith('image/') ? 'photo' : 'video',
      //mediaUrl: `/uploads/${file.filename}`
      mediaUrl: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`

    }));

    const saved = await Gallery.insertMany(entries);
    res.status(201).json(saved);
  } catch (err) {
    console.error('[uploadGallery error]', err);
    res.status(500).json({ error: 'Erreur serveur lors de l\'upload des médias' });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la galerie' });
  }
};
