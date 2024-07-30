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
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const detectedIngredients = ref([]);
    const $q = useQuasar();
    const router = useRouter();

    const onImageAdded = async (files) => {
      try {
        const image = files[0];
        const detectionResult = await roboflowService.detectIngredients(image);
        detectedIngredients.value = detectionResult.predictions;
      } catch (error) {
        console.error('Error detecting ingredients:', error);
      }
    };

    const generateRecipe = async () => {
      try {
        const ingredients = detectedIngredients.value.map(ingredient => ingredient.class);
        console.log('Ingredients:', ingredients);
        //ensure userId is int type

        const rawUserId = $q.localStorage.getItem('userId');
        const userId = parseInt(rawUserId);
        console.log('User ID:', userId);
        if (!userId) {
          throw new Error('User is not logged in');
        }

        const response = await api.post('/generate-recipe', { userId, ingredients });
        console.log('Recipe generated:', response.data.recipes);  // Log the response
        sessionStorage.setItem('recipes', JSON.stringify(response.data.recipes));
        router.push({ name: 'recipes'});
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
