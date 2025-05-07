const Wish = require('../models/Wish');

//! upload physic media
/*
exports.createWish = async (req, res) => {
    try {
      const { name, wish, mediaType } = req.body;
      let mediaUrl = null;
  
      if (!name || (!wish && !req.file)) {
        return res.status(400).json({ error: 'Name and either wish or media are required.' });
      }
  
      if (req.file) {
        mediaUrl = `/uploads/${req.file.filename}`;
      }
      console.log('[req.body]', req.body);
      console.log('[req.file]', req.file);
      
      const newWish = new Wish({ name, wish, mediaType, mediaUrl });
      const savedWish = await newWish.save();
      res.status(201).json(savedWish);
    } catch (error) {
      console.error('[createWish error]', error); // <= AJOUTE ÇA
      res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement du souhait' });
    }
  };
  */
//! upload only urls
exports.createWish = async (req, res) => {
  try {
    const { name, wish, mediaType, mediaUrl } = req.body;

    if (!name || (!wish && !mediaUrl)) {
      return res.status(400).json({ error: 'Nom et souhait ou média requis.' });
    }

    const newWish = new Wish({ name, wish, mediaType, mediaUrl });
    const savedWish = await newWish.save();
    res.status(201).json(savedWish);
  } catch (error) {
    console.error('[createWish error]', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du souhait.' });
  }
};

  
  

exports.getWishes = async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });
    res.status(200).json(wishes);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching wishes' });
  }
};
