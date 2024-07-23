import axios from 'axios';
import { ROBOFLOW_API_KEY, ROBOFLOW_MODEL, ROBOFLOW_VERSION } from 'src/config/roboflow';

export async function detectIngredients(imageBase64) {
  const url = `https://detect.roboflow.com/${ROBOFLOW_MODEL}/${ROBOFLOW_VERSION}?api_key=${ROBOFLOW_API_KEY}`;
  try {
    const response = await axios.post(
      url,
      { image: imageBase64 },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.predictions.map(prediction => prediction.class);
  } catch (error) {
    console.error('Error detecting ingredients:', error);
    throw error;
  }
}
