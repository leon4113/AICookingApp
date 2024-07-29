<template>
  <q-page padding>
    <q-uploader
      label="Upload an image"
      @added="onImageAdded"
      accept="image/*"
    />
    <div v-if="detectedIngredients.length">
      <h3>Detected Ingredients:</h3>
      <ul>
        <li v-for="ingredient in detectedIngredients" :key="ingredient.class">{{ ingredient.class }}</li>
      </ul>
      <q-btn @click="generateRecipe" label="Generate Recipe" color="primary" />
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import roboflowService from 'src/services/roboflowService';
import api from 'src/api';

export default {
  setup() {
    const detectedIngredients = ref([]);

    const onImageAdded = async (files) => {
      try {
        const image = files[0];
        const detectionResult = await roboflowService.detectIngredients(image);
        detectedIngredients.value = detectionResult.predictions;
        console.log('Detected Ingredients:', detectedIngredients.value);
      } catch (error) {
        console.error('Error detecting ingredients:', error);
      }
    };

    const generateRecipe = async () => {
      try {
        const ingredients = detectedIngredients.value.map(ingredient => ingredient.class);
        console.log('Ingredients:', ingredients);  // Log the processed ingredients array
        //ensure userId is int type

        const userId = $q.localStorage.getItem(userId);
        console.log('User ID:', userId);
        if (!userId) {
          throw new Error('User is not logged in');
        }

        const response = await api.post('/generate-recipe', { userId, ingredients });
        console.log('Recipe generated:', response.data.recipe);  // Log the response
        this.$router.push({ path: '/recipes', params: { recipes: response.data.recipe } });
      } catch (error) {
        console.error('Error generating recipe:', error);
      }
    };

    return {
      onImageAdded,
      detectedIngredients,
      generateRecipe,
    };
  }
};
</script>
