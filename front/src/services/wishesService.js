import api from '@/lib/api';

/**
 * Envoie un souhait à l'API backend
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} [payload.wish]
 * @param {string|null} [payload.mediaType]
 * @param {string|null} [payload.mediaUrl]
 */
/*
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
};*/
//! upload to server
/*
export const uploadWishes = async ({ name, wish, mediaType, mediaFile }) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('wish', wish || '');
    formData.append('mediaType', mediaFile ? mediaType : '');
    if (mediaFile) {
      formData.append('media', mediaFile); // backend expects `req.file`
    }

    const response = await api.post('/wishes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading wish:', error);
    throw error;
  }
};*/

//! upload to cloud and server

export const uploadWishes = async ({ name, wish, mediaType, mediaFile }) => {
  try {
    let mediaUrl = null;

    if (mediaFile) {
      mediaUrl = await uploadWishToCloudinary(mediaFile); // 1️⃣ upload vers Cloudinary
    }

    // 2️⃣ ensuite, on envoie les infos au backend (sans fichier)
    const response = await api.post('/wishes', {
      name,
      wish,
      mediaType,
      mediaUrl,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’envoi du souhait:', error);
    throw error;
  }
};


//! upload to cloudinary
export const uploadWishToCloudinary = async (file) => {
  const cloudName = 'dz0figs9c'; // remplace bien avec ton vrai cloudName
  const uploadPreset = 'public_upload'; // celui que tu as configuré

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'arabian_wishes'); // tu peux changer le nom du dossier

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    console.error('Erreur Cloudinary:', data);
    throw new Error('Échec de l’upload vers Cloudinary');
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
