import axios from 'axios';

const ROBOTFLOW_API_KEY = process.env.ROBOTFLOW_API_KEY;
const MODEL_ID_VERSION = 'food-ingredients-detection-6ce7j/1';


const roboflowService = {
  detectIngredients: async (imageFile) => {
    try {
      const imageBase64 = await toBase64(imageFile);
      const response = await axios({
        method: 'POST',
        url: `https://detect.roboflow.com/${MODEL_ID_VERSION}`,
        params: {
          api_key: ROBOTFLOW_API_KEY
        },
        data: imageBase64,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error detecting ingredients:', error);
      throw error;
    }
  }
};

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = error => reject(error);
});

export default roboflowService;
