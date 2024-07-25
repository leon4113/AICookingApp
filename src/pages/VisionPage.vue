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
import recipeStore from 'src/store/recipe';
import userStore from 'src/store/user';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const detectedIngredients = ref([]);
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
        await recipeStore.actions.generateRecipe(userStore.state.user.id, ingredients);
        router.push('/recipes');
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
