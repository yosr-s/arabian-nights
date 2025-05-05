import api from '@/lib/api';

/**
 * Envoie un souhait à l'API backend
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} [payload.wish]
 * @param {string|null} [payload.mediaType]
 * @param {string|null} [payload.mediaUrl]
 */
export const uploadWishes = async ({ name, wish, mediaType = null, mediaUrl = null }) => {
  try {
    const response = await api.post('/wishes', {
      name,
      wish,
      mediaType,
      mediaUrl
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading wish:', error);
    throw error;
  }
};

/**
 * Récupère tous les souhaits depuis l'API backend
 * @returns {Promise<Array>}
 */
export const fetchWishes = async () => {
  try {
    const response = await api.get('/wishes');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishes:', error);
    throw error;
  }
};
