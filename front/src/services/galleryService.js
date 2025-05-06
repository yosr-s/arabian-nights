// services/galleryService.js
import api from '@/lib/api';

/**
 * Envoie un ou plusieurs médias à la galerie
 * @param {FormData} formData - FormData contenant les fichiers à uploader
 * @returns {Promise<Object>}
 */
//! sends files to server uploads
/*
export const uploadGalleryMedia = async (formData) => {
  try {
    const response = await api.post('/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'upload des médias :', error);
    throw error;
  }
};
*/
export const uploadGalleryMedia = async (urls) => {
  try {
    const response = await api.post('/gallery', { media: urls }); // JSON, pas FormData
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'upload des médias :", error);
    throw error;
  }
};



//! upload to cloudinary
/**
 * Upload les fichiers directement vers Cloudinary
 * @param {FormData} formData - contenant les fichiers (clé: 'media')
 * @returns {Promise<Array<string>>} - URLs sécurisées Cloudinary
 */
export const uploadToCloudinary = async (formData) => {
  const cloudName = 'dz0figs9c';
  const uploadPreset = 'public_upload';

  const urls = [];

  for (const file of formData.getAll('media')) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', uploadPreset);
    uploadData.append('folder', 'arabian_gallery');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: uploadData,
    });

    const data = await response.json();

    if (data.secure_url) {
      urls.push(data.secure_url);
    } else {
      console.error('Erreur Cloudinary:', data);
      throw new Error('Upload Cloudinary échoué');
    }
  }

  return urls;
};

/**
 * Récupère tous les médias de la galerie
 * @returns {Promise<Array>}
 */
export const fetchGalleryMedia = async () => {
  try {
    const response = await api.get('/gallery');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des médias :', error);
    throw error;
  }
};
