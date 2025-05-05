// services/galleryService.js
import api from '@/lib/api';

/**
 * Envoie un ou plusieurs médias à la galerie
 * @param {FormData} formData - FormData contenant les fichiers à uploader
 * @returns {Promise<Object>}
 */
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
